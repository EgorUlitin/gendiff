import formatter from './formatter/index.js';
import diff from './diff.js';
import getData from './helpers/getData.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);
  const format = formatter(formatName);
  return format(diff(file1, file2));
};

export default genDiff;
