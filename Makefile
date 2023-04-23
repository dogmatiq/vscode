-include .makefiles/Makefile
-include .makefiles/pkg/js/v1/Makefile
-include .makefiles/pkg/js/v1/with-yarn.mk

artifacts/dist: tsconfig.json artifacts/link-dependencies.touch $(JS_SOURCE_FILES)
	@rm -rf "$@"
	$(JS_EXEC) tsc -p "$<"
	@touch "$@"

.makefiles/%:
	@curl -sfL https://makefiles.dev/v1 | bash /dev/stdin "$@"
