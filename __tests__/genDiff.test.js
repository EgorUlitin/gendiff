import {
  expect, test, describe,
} from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import genDiff from '../src/index.js';
import diff from '../src/genDiff.js';
import getFile from '../src/helpers/getFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const plainResult = fs.readFileSync(getPath('result'), 'utf-8');
const treeResult = fs.readFileSync(getPath('resultTree'), 'utf-8');
const textResult = fs.readFileSync(getPath('resultText'), 'utf-8');

const expectPlain = genDiff(
  './__fixtures__/plain/file1.json',
  './__fixtures__/plain/file2.json',
  'stylish',
);

const expectPlainYaml = genDiff(
  './__fixtures__/plain/file1.yml',
  './__fixtures__/plain/file2.yml',
  'stylish',
);

const expectTree = genDiff(
  './__fixtures__/trees/file1.json',
  './__fixtures__/trees/file2.json',
  'stylish',
);

const expectInline = genDiff(
  './__fixtures__/trees/file1.json',
  './__fixtures__/trees/file2.json',
  'plain',
);

const expectJson = genDiff(
  './__fixtures__/trees/file1.json',
  './__fixtures__/trees/file2.json',
  'json',
);

const file1 = getFile('./__fixtures__/trees/file1.json');
const file2 = getFile('./__fixtures__/trees/file2.json');

const resultJson = diff(
  file1,
  file2,
);

describe('check plain structure', () => {
  test('plain structure json', () => {
    expect(expectPlain).toBe(plainResult);
  });
  test('plain structure yaml', () => {
    expect(expectPlainYaml).toBe(plainResult);
  });
});

describe('check tree structure', () => {
  test('tree structure json', () => {
    expect(expectTree).toBe(treeResult);
  });
});

describe('check inline structure', () => {
  test('inline structure json', () => {
    expect(expectInline).toBe(textResult);
  });
});

describe('check json structure', () => {
  test('json structure json', () => {
    expect(expectJson).toBe(JSON.stringify(resultJson));
  });
});
