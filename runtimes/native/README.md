This directory contains the native runtime.

## Building

First grab the vendor dependencies:

```shell
git submodule update --init
```

Linux only: You'll need to install dependencies for X11 development. On Ubuntu these can be
installed with: `sudo apt install libxrandr-dev libxinerama-dev libxcursor-dev libxi-dev
libxext-dev`

Building:

```shell
cmake -B build
cmake --build build
```

Running:

```shell
./build/wasm4
```

For release builds, pass `-DCMAKE_BUILD_TYPE=Release` to cmake.
