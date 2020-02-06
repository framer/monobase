bootstrap:
	@test -d ./node_modules || yarn

serve: bootstrap
	@./node_modules/.bin/monobase serve

build: bootstrap
	@./node_modules/.bin/monobase build

upgrade:
	yarn add monobase@latest

.DEFAULT_GOAL := serve