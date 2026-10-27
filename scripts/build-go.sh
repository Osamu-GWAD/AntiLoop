#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
GO_CORE_DIR="$ROOT_DIR/go-core"
BIN_DIR="$GO_CORE_DIR/bin"

mkdir -p "$BIN_DIR"
cd "$GO_CORE_DIR"

TARGET="${1:-current}"

echo "Building AntiLoop Go daemon (target: $TARGET)..."

build_target() {
  local os=$1
  local arch=$2
  local output=$3
  echo "Compiling for $os/$arch -> $output"
  CGO_ENABLED=0 GOOS=$os GOARCH=$arch go build -trimpath -ldflags="-s -w" -o "$BIN_DIR/$output" ./cmd/antiloop
}

case "$TARGET" in
  all)
    build_target linux amd64 antiloop-linux-amd64
    build_target linux arm64 antiloop-linux-arm64
    build_target darwin amd64 antiloop-darwin-amd64
    build_target darwin arm64 antiloop-darwin-arm64
    build_target windows amd64 antiloop-windows-amd64.exe
    build_target windows arm64 antiloop-windows-arm64.exe
    ;;
  linux)
    build_target linux amd64 antiloop-linux-amd64
    build_target linux arm64 antiloop-linux-arm64
    ;;
  darwin)
    build_target darwin amd64 antiloop-darwin-amd64
    build_target darwin arm64 antiloop-darwin-arm64
    ;;
  windows)
    build_target windows amd64 antiloop-windows-amd64.exe
    build_target windows arm64 antiloop-windows-arm64.exe
    ;;
  current|*)
    CURRENT_OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
    CURRENT_ARCH="$(uname -m)"
    if [ "$CURRENT_ARCH" = "x86_64" ]; then
      CURRENT_ARCH="amd64"
    elif [ "$CURRENT_ARCH" = "aarch64" ]; then
      CURRENT_ARCH="arm64"
    fi

    OUT_NAME="antiloop-${CURRENT_OS}-${CURRENT_ARCH}"
    if [ "$CURRENT_OS" = "windows" ] || [[ "$CURRENT_OS" =~ msys|mingw|cygwin ]]; then
      CURRENT_OS="windows"
      OUT_NAME="antiloop-windows-${CURRENT_ARCH}.exe"
    fi

    build_target "$CURRENT_OS" "$CURRENT_ARCH" "$OUT_NAME"
    ;;
esac

echo "Build complete. Artifacts in $BIN_DIR"
