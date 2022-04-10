import formatter from './formatter/index.js';
import genDiff from './genDiff.js';
import getFile from './helpers/getFile.js';

export default (filepath1, filepath2, format) => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);
  const diff = genDiff(file1, file2);
  const formatForView = formatter(format);
  return formatForView(diff);
};
