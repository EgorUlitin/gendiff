import {
  expect, test, describe, beforeAll,
} from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => join(__dirname, '..', '__fixtures__', filename);

let plainResult;
let treeResult;
let textResult;

beforeAll(() => {
  plainResult = fs.readFileSync(getPath('result'), 'utf-8');
  treeResult = fs.readFileSync(getPath('resultTree'), 'utf-8');
  textResult = fs.readFileSync(getPath('resultText'), 'utf-8');
});

const plainJson = genDiff(
  './__fixtures__/plain/file1.json',
  './__fixtures__/plain/file2.json',
  'stylish',
);

const plainYaml = genDiff(
  './__fixtures__/plain/file1.yml',
  './__fixtures__/plain/file2.yml',
  'stylish',
);

const treeJson = genDiff(
  './__fixtures__/trees/file1.json',
  './__fixtures__/trees/file2.json',
  'stylish',
);

const textJson = genDiff(
  './__fixtures__/trees/file1.json',
  './__fixtures__/trees/file2.json',
  'plain',
);

describe('check plain structure', () => {
  test('plain structure json', () => {
    expect(plainJson).toBe(plainResult);
  });
  test('plain structure yaml', () => {
    expect(plainYaml).toBe(plainResult);
  });
});

describe('check tree structure', () => {
  test('tree structure json', () => {
    expect(treeJson).toBe(treeResult);
  });
});

describe('check text structure', () => {
  test('text structure json', () => {
    expect(textJson).toBe(textResult);
  });
});
