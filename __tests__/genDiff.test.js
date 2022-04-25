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

describe('genDiff', () => {
  test('stylish', () => {
    const file1 = getPath('file1.json', 'utf-8');
    const file2 = getPath('file2.yml', 'utf-8');
    const expectStylish = genDiff(file1, file2, 'stylish');
    expect(expectStylish).toBe(stylishResult);
  });
  test('plain', () => {
    const file1 = getPath('file1.json', 'utf-8');
    const file2 = getPath('file2.yml', 'utf-8');
    const expectPlain = genDiff(file1, file2, 'plain');
    expect(expectPlain).toBe(plainResult);
  });
  test('json', () => {
    const file1 = getPath('file1.json', 'utf-8');
    const file2 = getPath('file2.yml', 'utf-8');
    const expectJson = genDiff(file1, file2, 'json');
    expect(() => JSON.parse(expectJson)).not.toThrow();
  });
});
