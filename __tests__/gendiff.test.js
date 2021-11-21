import * as fs from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../bin/gendiff';

const json1 = fs.readFileSync('./file1.json', 'utf-8');
const json2 = fs.readFileSync('./file2.json', 'utf-8');

test('check type of file', () => {
  expect(typeof json1).toEqual('string');
});

test('check type of return', () => {
  const res = gendiff(json1, json2);
  expect(typeof res).toEqual('string');
});
