import _ from 'lodash';

export default (file1, file2) => {
  const objToArr1 = Object.keys(file1);
  const objToArr2 = Object.keys(file2);
  const commonArr = [...objToArr1, ...objToArr2];
  const result = [];
  _.uniq(commonArr.sort())
    .map((key) => {
      if (objToArr1.includes(key) && objToArr2.includes(key)) {
        return file1[key] === file2[key] ? result.push(`    ${key}: ${file1[key]}`) : result.push(`  - ${key}: ${file1[key]}`, `  + ${key}: ${file2[key]}`);
      }
      return objToArr1.includes(key) ? result.push(`  - ${key}: ${file1[key]}`) : result.push(`  + ${key}: ${file2[key]}`);
    });
  return ['{', ...result, '}'].join('\n');
};
