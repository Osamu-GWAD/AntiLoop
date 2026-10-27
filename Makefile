.PHONY: all build build-go build-ts package clean

all: build

build: build-go build-ts

build-go:
	@echo "Building Go daemon binaries..."
	bash scripts/build-go.sh all

build-ts:
	@echo "Building TypeScript extension..."
	npm run compile:prod

package: build
	@echo "Packaging VSIX extension..."
	npx -y @vscode/vsce package --no-dependencies

clean:
	rm -rf out *.vsix
