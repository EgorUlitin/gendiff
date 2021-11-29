import _ from 'lodash';

import types from './helpers/types.js';

const dictionary = [
  {
    check: (file1, file2) => _.isObject(file1) && _.isObject(file2),
    status: (file1, file2, takeNext) => ({ children: takeNext(file1, file2), type: types.NODE }),
  },
  {
    check: (file1, file2) => !_.isUndefined(file1) && _.isUndefined(file2),
    status: (file1, file2, takeNext, takeChildren) => ({ oldValue: file1, type: types.REMOVED, children: takeChildren(file1)}),
  },
  {
    check: (file1, file2) => _.isUndefined(file1) && !_.isUndefined(file2),
    status: (file1, file2, takeNext, takeChildren) => ({ newValue: file2, type: types.ADDED, children: takeChildren(file2) }),
  },
  {
    check: (file1, file2) => !_.isEqual(file1, file2),
    status: (file1, file2, takeNext, takeChildren) => ({ oldValue: file1, newValue: file2, type: types.CHANGED, children: takeChildren(file2) }),
  },
  {
    check: (file1, file2) => _.isEqual(file1, file2),
    status: (file1, file2, takeNext, takeChildren) => ({ oldValue: file1, type: types.UNCHANGED, children: takeChildren(file1) }),
  },
];

const getChildren = (data) => {
  const res = [];
  if (_.isObject(data)) {
    const children = Object.entries(data);
    children.map((child) => {
      if (_.isObject(child.value)) {
        getChildren(child.value);
      } else {
        res.push(child);
      }
    });
  }
  return res;
};
const genDiff = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2)).sort();
  return keys.map((key) => {
    const file1Value = file1[key];
    const file2Value = file2[key];
    const { status } = dictionary.find(({ check }) => check(file1Value, file2Value));

    return { key, ...status(file1Value, file2Value, genDiff, getChildren) };
  });
};

export default genDiff;
