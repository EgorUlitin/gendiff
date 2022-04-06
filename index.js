import * as path from 'path';
import * as fs from 'fs';
import _ from 'lodash';

const getFile = (entriesValue) => {
  // const ext = path.extname(entriesValue);

  const filePath = path.isAbsolute(entriesValue)
    ? entriesValue
    : path.resolve(process.cwd(), entriesValue);

  const file = fs.readFileSync(filePath, 'utf-8');

  return JSON.parse(file);
};

const genDiff = (entriesValue1, entriesValue2) => {
  const file1 = getFile(entriesValue1);
  const file2 = getFile(entriesValue2);

  const keys = _.union(Object.keys(file1), Object.keys(file2)).sort();

  return `{\n${keys
    .map((key) => {
      const value1 = file1[key];
      const value2 = file2[key];

      const tab = '  ';

      if (!file2[key]) {
        return `${tab}- ${key}: ${value1}\n`;
      }
      if (!file1[key]) {
        return `${tab}+ ${key}: ${value2}\n`;
      }
      if (file1[key] === file2[key]) {
        return `${tab}  ${key}: ${value1}\n`;
      }
      return `${tab}- ${key}: ${value1}\n${tab}+ ${key}: ${value2}\n`;
    })
    .join('')}}`;
};
export default genDiff;
