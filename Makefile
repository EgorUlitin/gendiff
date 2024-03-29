install: 
	npm ci

gendiff:
	node bin/index.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

prettier:
	npx prettier --write .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8