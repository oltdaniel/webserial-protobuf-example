#include <Arduino.h>

#ifndef ARDUINO_USB_MODE
#error This ESP32 SoC has no Native USB interface
#elif ARDUINO_USB_MODE == 1
#warning This sketch should be used when USB is in OTG mode
void setup() {}
void loop() {}
#else
#include "USB.h"

#if ARDUINO_USB_CDC_ON_BOOT
#define HWSerial Serial0
#define USBSerial Serial
#else
#define HWSerial Serial
USBCDC USBSerial;
#endif

// Include nanopb dependencies
#include <pb_encode.h>
#include <pb_decode.h>
#include <pb_arduino.h>

// Include compiled proto file header
#include "system.pb.h"

// Create nanopb streams from USBSerial Interface
pb_istream_t pb_in = as_pb_istream(USBSerial);
pb_ostream_t pb_out = as_pb_ostream(USBSerial);

// Handle all USB events that come our way and log them onto the other serial interface
static void usbEventCallback(void *arg, esp_event_base_t event_base, int32_t event_id, void *event_data)
{
  if (event_base == ARDUINO_USB_EVENTS)
  {
    arduino_usb_event_data_t *data = (arduino_usb_event_data_t *)event_data;
    switch (event_id)
    {
    case ARDUINO_USB_STARTED_EVENT:
      HWSerial.println("USB PLUGGED");
      break;
    case ARDUINO_USB_STOPPED_EVENT:
      HWSerial.println("USB UNPLUGGED");
      break;
    case ARDUINO_USB_SUSPEND_EVENT:
      HWSerial.printf("USB SUSPENDED: remote_wakeup_en: %u\n", data->suspend.remote_wakeup_en);
      break;
    case ARDUINO_USB_RESUME_EVENT:
      HWSerial.println("USB RESUMED");
      break;

    default:
      break;
    }
  }
  else if (event_base == ARDUINO_USB_CDC_EVENTS)
  {
    arduino_usb_cdc_event_data_t *data = (arduino_usb_cdc_event_data_t *)event_data;
    switch (event_id)
    {
    case ARDUINO_USB_CDC_CONNECTED_EVENT:
      HWSerial.println("CDC CONNECTED");
      break;
    case ARDUINO_USB_CDC_DISCONNECTED_EVENT:
      HWSerial.println("CDC DISCONNECTED");
      break;
    case ARDUINO_USB_CDC_LINE_STATE_EVENT:
      HWSerial.printf("CDC LINE STATE: dtr: %u, rts: %u\n", data->line_state.dtr, data->line_state.rts);
      break;
    case ARDUINO_USB_CDC_LINE_CODING_EVENT:
      HWSerial.printf("CDC LINE CODING: bit_rate: %u, data_bits: %u, stop_bits: %u, parity: %u\n", data->line_coding.bit_rate, data->line_coding.data_bits, data->line_coding.stop_bits, data->line_coding.parity);
      break;
    case ARDUINO_USB_CDC_RX_EVENT:
      HWSerial.printf("CDC RX [%u]\n", data->rx.len);
      // NOTE: Do not read data here, keep it within the serial stream
      break;
    case ARDUINO_USB_CDC_RX_OVERFLOW_EVENT:
      HWSerial.printf("CDC RX Overflow of %d bytes", data->rx_overflow.dropped_bytes);
      break;

    default:
      break;
    }
  }
}

void setup()
{
  // Initialize logging serial interface
  HWSerial.begin(115200);
  HWSerial.setDebugOutput(true);

  // Change USB details
  USB.VID(0x303A); // VID From espressif, see https://docs.espressif.com/projects/esp-iot-solution/en/latest/usb/usb_overview/usb_vid_pid.html#in-the-following-scenarios-you-can-exempt-from-applying-for-vid-and-pid
  USB.PID(0xB055);
  USB.productName("NAK CheckIn Dongle");
  USB.manufacturerName("T22");
  USB.webUSB(true); // Just for testing purposes

  // Handle usb events
  USB.onEvent(usbEventCallback);
  USBSerial.onEvent(usbEventCallback);

  // Start usb routines
  USBSerial.begin();
  USB.begin();
}

bool sendSystemMessage(SystemMessage *message)
{
  if (!pb_encode_delimited(&pb_out, SystemMessage_fields, message))
  {
    HWSerial.printf("Encode failed: %s\n", PB_GET_ERROR(&pb_out));
    return false;
  }

  return true;
}

void loop()
{
  if (USBSerial.available())
  {
    SystemMessage systemMessage = {};

    if (!pb_decode_delimited(&pb_in, SystemMessage_fields, &systemMessage))
    {
      HWSerial.printf("Decode failed: %s\n", PB_GET_ERROR(&pb_in));
      return;
    }

    HWSerial.printf("Go message of type %d\n", systemMessage.which_message);

    switch (systemMessage.which_message)
    {
    case SystemMessage_ping_tag:
    {
      auto pingMessage = systemMessage.message.ping;

      SystemMessage outgoingMessage = {
          .which_message = SystemMessage_pong_tag,
          .message = {
              .pong = {}}};

      sendSystemMessage(&outgoingMessage);

      break;
    }

    case SystemMessage_pong_tag:
    {
      auto pongMessage = systemMessage.message.pong;

      break;
    }

    // Handle incoming time message
    case SystemMessage_time_tag:
    {
      auto timeMessage = systemMessage.message.time;

      if (timeMessage.current == 0)
      {
        SystemMessage outgoingMessage = {
            .which_message = SystemMessage_time_tag,
            .message = {
                .time = {
                    .current = millis()}}};

        sendSystemMessage(&outgoingMessage);
      }
      break;
    }

    default:
      break;
    }
  }
}
#endif /* ARDUINO_USB_MODE */