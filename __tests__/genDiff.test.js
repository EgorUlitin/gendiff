import { expect, test, describe } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

const getPath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const res = fs.readFileSync(getPath('result'), 'utf-8');

const plainJson = genDiff(
  './__fixtures__/file1.json',
  './__fixtures__/file2.json',
);

const plainYaml = genDiff(
  './__fixtures__/file1.yml',
  './__fixtures__/file2.yml',
);

describe('check gendiff function', () => {
  test('plain structure json', () => {
    expect(plainJson).toBe(res);
  });
  test('plain structure yaml', () => {
    expect(plainYaml).toBe(res);
  });
});
