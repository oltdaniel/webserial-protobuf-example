# WebSerial Protocolbuffer example

Sending protcolbuffers between the browser and an ESP32 via WebSerial.

## Preview

TODO: Insert screenshot

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
2. Install all dependencies using `yarn`.
3. Compile the protobuffer file using `yarn proto:build`.

## License

[MIT License](./LICENSE)