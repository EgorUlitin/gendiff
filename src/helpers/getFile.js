import * as fs from 'fs';
import * as path from 'path';
import parser from '../parsers.js';

const getFile = (filepath) => {
  const fPath = path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(filepath, 'utf8');
  return parser(file, fPath);
};

export default getFile;
