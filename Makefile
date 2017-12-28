bootstrap:
	@test -d ./node_modules || yarn

dist: bootstrap
	@rm -Rf dist
	./node_modules/.bin/tsc

serve: bootstrap
	./node_modules/.bin/ts-node src/cli.ts serve --project=examples/default.com

build: bootstrap
	./node_modules/.bin/ts-node src/cli.ts build --project=examples/default.com

# test: bootstrap
# 	./node_modules/.bin/jest --watch

# docs: bootstrap
# 	./node_modules/.bin/typedoc --out dist/docs

publish: dist
	yarn publish
	git commit -a -m "publised new version"