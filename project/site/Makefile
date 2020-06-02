bootstrap:
	@test -d ./node_modules || yarn
	@rm -Rf ./node_modules/react
	@rm -Rf ./node_modules/react-dom

serve: bootstrap
	@./node_modules/.bin/monobase serve

clean:
	rm -Rf ./node_modules
	rm -Rf ./build

build: bootstrap
	@./node_modules/.bin/monobase build

upgrade:
	yarn add monobase@latest

.DEFAULT_GOAL := serve