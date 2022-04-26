import * as path from 'path';
import * as fs from 'fs';
import parser from './parsers.js';
import formatter from './formatter/index.js';
import diff from './diff.js';

const getData = (filePath) => {
  const type = path.extname(filePath).slice(1);
  const checkedFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);
  const file = fs.readFileSync(checkedFilePath, 'utf-8');

  return parser(file, type);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);
  const format = formatter(formatName);
  return format(diff(file1, file2));
};

export default genDiff;
