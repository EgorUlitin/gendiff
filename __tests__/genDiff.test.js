import { expect, test, describe, beforeAll } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => join(__dirname, '..', '__fixtures__', filename);

let plainRes;
let treeRes;

beforeAll(() => {
  plainRes = fs.readFileSync(getPath('result'), 'utf-8');
  treeRes = fs.readFileSync(getPath('resultTree'), 'utf-8');
});

const plainJson = genDiff(
  './__fixtures__/plain/file1.json',
  './__fixtures__/plain/file2.json',
);

const plainYaml = genDiff(
  './__fixtures__/plain/file1.yml',
  './__fixtures__/plain/file2.yml',
);

const treeJson = genDiff(
  './__fixtures__/trees/file1.json',
  './__fixtures__/trees/file2.json',
);

describe('check plain structure', () => {
  test('plain structure json', () => {
    expect(plainJson).toBe(plainRes);
  });
  test('plain structure yaml', () => {
    expect(plainYaml).toBe(plainRes);
  });
});

describe('check tree structure', () => {
  test('plain structure json', () => {
    expect(treeJson).toBe(treeRes);
  });
  // test('plain structure yaml', () => {
  //   expect(plainYaml).toBe(res);
  // });
});
