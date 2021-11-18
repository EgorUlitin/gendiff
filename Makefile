install: 
	npm ci

gendiff:
	node bin/index.js

publish:
	npm publish --dry-run

lint:
	npx eslint .