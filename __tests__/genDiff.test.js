import { expect, test, describe } from '@jest/globals';
import genDiff from '../index.js';

const res = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const entries = genDiff(
  './__fixtures__/file1.json',
  // eslint-disable-next-line comma-dangle
  './__fixtures__/file2.json'
);

describe('check gendiff function', () => {
  test('plain structure', () => {
    expect(entries).toBe(res);
  });
});
