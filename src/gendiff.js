import _ from 'lodash';

import types from './helpers/types.js';

const dictionary = [
  {
    check: (file1, file2) => _.isObject(file1) && _.isObject(file2),
    status: (file1, file2, takeNext) => ({ children: takeNext(file1, file2), type: types.NODE }),
  },
  {
    check: (file1, file2) => !_.isUndefined(file1) && _.isUndefined(file2),
    status: (file1) => ({ oldValue: file1, type: types.REMOVED }),
  },
  {
    check: (file1, file2) => _.isUndefined(file1) && !_.isUndefined(file2),
    status: (file1, file2) => ({ newValue: file2, type: types.ADDED }),
  },
  {
    check: (file1, file2) => !_.isEqual(file1, file2),
    status: (file1, file2) => ({ oldValue: file1, newValue: file2, type: types.CHANGED }),
  },
  {
    check: (file1, file2) => _.isEqual(file1, file2),
    status: (file1) => ({ oldValue: file1, type: types.UNCHANGED }),
  },
];

const genDiff = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2)).sort();
  return keys.map((key) => {
    const file1Value = file1[key];
    const file2Value = file2[key];

    const { status } = dictionary.find(({ check }) => check(file1Value, file2Value));

    return { key, ...status(file1Value, file2Value, genDiff) };
  });
};

export default genDiff;
