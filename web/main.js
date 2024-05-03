import { Reader } from 'protobufjs';
import { SystemMessage } from './system.proto';

function e(id) { return document.getElementById(id) }

const ERROR = 'ERROR', INFO = 'INFO'

function log(type, message) {
  terminal.value += `[${(new Date().toLocaleTimeString())}][${type}]: ${message}\n`
  terminal.scrollTop = terminal.scrollHeight;

  if (type === ERROR) {
    console.error(message)
  }
}

function concatBuffers(...bufs) {
  const result = new Uint8Array(bufs.reduce((totalSize, buf) => totalSize + buf.byteLength, 0));
  bufs.reduce((offset, buf) => {
    result.set(buf, offset)
    return offset + buf.byteLength
  }, 0)
  return result;
}

class Device {
  constructor(port) {
    this.port = port
    this.previousBuffer = new Uint8Array([]);
  }

  async open(baud) {
    await this.port.open({ baudRate: baud })
  }

  sendMessage(messageClass, properties) {
    // Aquire writer
    const writer = this.port.writable.getWriter();

    try {
      var reqMessage = messageClass.create(properties);
      writer.write(messageClass.encodeDelimited(reqMessage).finish())
      log(INFO, "send message")
    } catch (e) {
      log(ERROR, e)
    } finally {
      writer.releaseLock()
    }
  }

  messageAvailable() {
    return this.previousBuffer.length > 0;
  }

  async receiveMessage(messageClass, timeout = 500) {
    // Start with previous buffer
    var buf = this.previousBuffer;

    // Keep track of read timeout function
    var readTimeout = null;

    // Repeat until message found
    while (this.port.readable) {
      // Find a message in the current buffer
      try {
        const pbReader = Reader.create(buf);
        var message = messageClass.decodeDelimited(pbReader);

        // If the reader reached an expected halt, return message
        if (pbReader.pos <= pbReader.len) {
          this.previousBuffer = buf.slice(pbReader.pos);

          return message;
        }
      } catch (e) {
        // NOTE: This is likely an error from the protocol buffer parser, ignore and hope for more bytes
      }

      // Get a new reader
      const reader = this.port.readable.getReader();

      // Read more bytes
      try {
        // Read next bytes with a timeout
        readTimeout = setTimeout(() => reader.releaseLock(), timeout)
        var { done, value } = await reader.read();
        clearTimeout(readTimeout)
        buf = concatBuffers(buf, value)

        log(INFO, `Received: ${new TextDecoder().decode(value)} (${value})`)

        if (done) {
          break;
        }
      } catch (e) {
        // NOTE: We mainly get release errors for the reader here
      } finally {
        reader.releaseLock()
      }
    }

    return null;
  }

  async close() {
    await this.port.close()
  }
}

// =====================
// Some informations about port connections
// =====================

navigator.serial.addEventListener("connect", (e) => {
  // Connect to `e.target` or add it to a list of available ports.
  log(INFO, 'a new port connected and is available')
});

navigator.serial.addEventListener("disconnect", (e) => {
  // Remove `e.target` from the list of available ports.

  // TODO: If port is current device, close the device
  log(INFO, 'a port disconnected and is now unavailable')
});

navigator.serial.getPorts().then((ports) => {
  log(INFO, `there is a total of ${ports.length} ports available currently`)
});

// =====================
// Main logic
// =====================

const terminal = e('terminal-output'),
  connectBtn = e('connect-btn'),
  pingBtn = e('ping-btn'),
  timeBtn = e('time-btn'),
  baudInp = e('baud-inp')

// NOTE: This is so high to show how piled up bytes are getting processed
const ROUTINE_INTERVALL = 1000;

var currentDevice = null, currentRoutine = null;

function handleIncomingSystemMessage(systemMessage) {
  if (!systemMessage) return;

  switch (systemMessage.message) {
    case "ping":
      log(INFO, 'Received ping from device.')

      const writer = port.writable.getWriter();

      try {

        var reqMessage = new SystemMessage({
          message: "pong",
          pong: {}
        })

        var req = SystemMessage.encodeDelimited(reqMessage).finish();

        console.log(req)

        writer.write(req)
      } catch (e) {
        console.error(e)
      } finally {
        writer.releaseLock()
      }

      break;

    case "pong":
      log(INFO, 'Received pong from device.')
      break;

    case "time":
      log(INFO, `Received time=${systemMessage.time.current} from device.`)
      break;

    default:
      break;
  }
}

connectBtn.addEventListener("click", async () => {
  // Pre-filtered device lists
  const usbVendorId = 0x303A, usbProductId = 0xB055;

  // Disable relevant ui elements
  connectBtn.disabled = true;
  baudInp.disabled = true;

  // Request ports from user
  await navigator.serial
    .requestPort({ filters: [{ usbVendorId, usbProductId }] })
    .then(async (port) => {
      // Make sure these UI elements are disable during setup
      pingBtn.disabled = true;
      timeBtn.disabled = true;

      // Clean-up current routine
      if (currentRoutine) {
        clearInterval(currentRoutine)
      }

      // Clean-up current device
      if (currentDevice) {
        currentDevice.close()
        currentDevice = null;
      }

      // Create new device
      try {
        var newDevice = new Device(port)

        await newDevice.open(baudInp.value)

        currentDevice = newDevice

        async function routineFunction() {
          try {
            var message = await currentDevice.receiveMessage(SystemMessage)

            handleIncomingSystemMessage(message)
          } catch (e) {
            log(ERROR, e)
          }

          currentRoutine = setTimeout(routineFunction, ROUTINE_INTERVALL)
        }

        // NOTE: This is a temporary solution for low CPU usage to avoid UI lags
        // SOLUTION: Create a background worker for this shit
        currentRoutine = setTimeout(routineFunction, ROUTINE_INTERVALL)

        // Enable ui elements that can be used now
        pingBtn.disabled = false;
        timeBtn.disabled = false;
      } catch (e) {
        log(ERROR, e)
      }
    })
    .catch((e) => {
      // The user didn't select a port.
      console.error(e)
    });

  // Enable usable ui again
  connectBtn.disabled = false;
  baudInp.disabled = false;
});

pingBtn.addEventListener("click", () => {
  if (currentDevice) {
    currentDevice.sendMessage(SystemMessage, {
      message: "ping",
      ping: {}
    })
  }
})

timeBtn.addEventListener("click", () => {
  if (currentDevice) {
    currentDevice.sendMessage(SystemMessage, {
      message: "time",
      time: {
        current: 0
      }
    })
  }
})