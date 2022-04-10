import * as path from 'path';
import * as fs from 'fs';
import parser from '../parsers.js';

export default (entriesValue) => {
  const filePath = path.isAbsolute(entriesValue)
    ? entriesValue
    : path.resolve(process.cwd(), entriesValue);
  const file = fs.readFileSync(filePath, 'utf-8');

  return parser(filePath, file);
};
