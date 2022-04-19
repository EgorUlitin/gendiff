import {
  expect, test, describe,
} from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const stylishResult = fs.readFileSync(getPath('resultStylish'), 'utf-8');
const plainResult = fs.readFileSync(getPath('resultPlain'), 'utf-8');

const expectStylish = genDiff(
  './__fixtures__/file1.json',
  './__fixtures__/file2.yml',
  'stylish',
);

const expectPlain = genDiff(
  './__fixtures__/file1.json',
  './__fixtures__/file2.yml',
  'plain',
);

const expectJson = genDiff(
  './__fixtures__/file1.json',
  './__fixtures__/file2.yml',
  'json',
);

describe('check stylish structure', () => {
  test('stylish structure json', () => {
    expect(expectStylish).toBe(stylishResult);
  });
});

describe('check plain structure', () => {
  test('plain structure json', () => {
    expect(expectPlain).toBe(plainResult);
  });
});

describe('check json structure', () => {
  test('json structure json', () => {
    expect(() => expectJson).not.toThrow();
  });
});
