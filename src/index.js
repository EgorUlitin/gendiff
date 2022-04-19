import formatter from './formatter/index.js';
import diff from './diff.js';
import getFile from './helpers/getFile.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);
  const format = formatter(formatName);
  return format(diff(file1, file2));
};

export default genDiff;
