import getFile from './helpers/getFile.js';
import formatter from './formatters/index.js';
import genDiff from './gendiff.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);
  const formatForView = formatter(format);
  const diff = genDiff(file1, file2);
  return formatForView(diff);
};
