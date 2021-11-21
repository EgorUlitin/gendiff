import * as fs from 'fs';
import { describe, expect, test } from '@jest/globals';
import parser from '../src/parsers';

const json1 = fs.readFileSync('./__fixtures__/file1.json', 'utf-8');
const yml1 = fs.readFileSync('./__fixtures__/file1.yml', 'utf-8');

describe('check format parse', () => {
  const obj1 = parser(json1, './__fixtures__/file1.json');
  const obj2 = parser(yml1, './__fixtures__/file1.yml');
  test('check json format', () => {
    expect(typeof obj1).toBe('object');
  });
  test('check yml formate', () => {
    expect(typeof obj2).toBe('object');
  });
});
