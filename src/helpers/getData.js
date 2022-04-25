import * as path from 'path';
import * as fs from 'fs';
import parser from '../parsers.js';

export default (filePath) => {
  const type = path.extname(filePath).slice(1);
  const checkedFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);
  const file = fs.readFileSync(checkedFilePath, 'utf-8');

  return parser(file, type);
};
