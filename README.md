> **NOTE**: This project is just a small example to prove this is possible. The code in this repo was mostly written in a single afternoon with the motivation of "get this somehow working". Maybe I'll rewrite it some day for a much cleaner version with better abstraction.

# WebSerial Protocolbuffer example

Sending protcolbuffers between the browser and an ESP32 via WebSerial.

## Preview

| | |
|-|-|
| <img src="https://github.com/oltdaniel/webserial-protobuf-example/assets/53529846/141083cf-4d77-4ded-b96b-f06361277871" width="300" /> | <img src="https://github.com/oltdaniel/webserial-protobuf-example/assets/53529846/e2acf29d-df8f-4b3a-9e97-604d2f32f488" width="300" /> |

## Components

This project uses the following software:
- [nanopb](https://github.com/nanopb/nanopb) for using protocolbuffers on the esp32 within the arduino framework using some glue from [eric-wieser/nanopb-arduino](https://github.com/eric-wieser/nanopb-arduino).
- [protobuf.js](https://github.com/protobufjs/protobuf.js) to use protocolbuffers in the web application interface.
- [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API) to get both the ESP32 and Web Interface talking via Serial. This is only supported on chrome-based browsers (last check: 2024-05-03).
- [Protocol Buffers](https://protobuf.dev/) as the base idea of protocol to make this communication.

## Getting started

### Requirements

- [PlatformIO](https://platformio.org/)
- [Node.js](https://nodejs.org)
- [WEMOS S2 Mini or similar](https://www.wemos.cc/en/latest/s2/s2_mini.html)

### Install

```bash
git clone https://github.com/oltdaniel/webserial-protobuf-example.git
cd webserial-protobuf-example
```

#### Program the ESP32 Board with the firmware

> **NOTE** The boards need to supported USB OTG.

Open the repository in VSCode and flash the current project. All dependencies will be downloaded automatically.

#### Prepare and start the web interface

Steps to get started with the project:
1. Open the `web` directory of this repo.
2. Start the dev server with `yarn dev`.

Steps to compile the new proto file:
1. Install all dependencies using `yarn`.
2. Compile the protobuffer file using `yarn proto:build`.

## License

[MIT License](./LICENSE)
