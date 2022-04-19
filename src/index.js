import formatter from './formatter/index.js';
import diff from './diff.js';
import getFile from './helpers/getFile.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);
  const formatForView = formatter(format);
  return formatForView(diff(file1, file2));
};

export default genDiff;
