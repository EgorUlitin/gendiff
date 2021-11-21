import * as fs from 'fs';
import { test, expect, describe } from '@jest/globals';
import gendiff from '../src/gendiff';

const json1 = fs.readFileSync('./__fixtures__/file1.json', 'utf-8');
const json2 = fs.readFileSync('./__fixtures__/file1.json', 'utf-8');

describe('check gendiff function', () => {
  test('check type of file', () => {
    expect(typeof json1).toEqual('string');
  });

  test('check type of return', () => {
    const res = gendiff(json1, json2);
    expect(typeof res).toEqual('string');
  });
});
