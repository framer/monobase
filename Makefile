project = ./project

bootstrap:
	@test -d ./node_modules || yarn

dist: bootstrap
	@rm -Rf dist
	./node_modules/.bin/tsc

serve: bootstrap
	./node_modules/.bin/ts-node -P $(project) src/cli.ts serve --project=$(project)

build: bootstrap
	./node_modules/.bin/ts-node -P $(project) src/cli.ts build --project=$(project)

# test: bootstrap
# 	./node_modules/.bin/jest --watch

# docs: bootstrap
# 	./node_modules/.bin/typedoc --out dist/docs

publish: git-check dist
	yarn publish
	make project
	-git commit -a -m "*** published new version"
	-git push

project:
	-rm project.zip 
	zip -X -r project.zip project -x "*.DS_Store" -x "node_modules" -x "project/monobase.ts" -x "project/build/*"
	md5 project.zip

git-check:
	@status=$$(git status --porcelain); \
	if test "x$${status}" = x; then \
		git push; \
	else \
		echo "\n\n!!! Working directory is dirty, commit/push first !!!\n\n" >&2; exit 1 ; \
	fi



TEMPDIR := $(shell mktemp -d)

test:
	cd $(TEMPDIR); \
		curl -L -O https://raw.githubusercontent.com/koenbok/monobase/master/project.zip; \
		unzip project.zip; \
		cd project; \
		make serve

.DEFAULT_GOAL := serve
.PHONY: project