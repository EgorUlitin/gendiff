import _ from 'lodash';
import types from './helpers/types.js';

const getChildren = (data) => {
  const entries = Object.entries(data);
  return entries.map(([key, value]) => {
    if (_.isObject(value)) {
      return getChildren(value);
    }
    return { [key]: value };
  });
};

const dictionary = [
  {
    check: (value1, value2) => _.isObject(value1) && _.isObject(value2),
    status: (value1, value2, diff) => ({
      children: diff(value1, value2),
      type: types.NODE,
    }),
  },
  {
    check: (value1, value2) => !_.isUndefined(value1) && _.isUndefined(value2),
    status: (value1, value2) => ({
      old: value1,
      newValue: value2,
      children: _.isObject(value1) && getChildren(value1),
      type: types.REMOVE,
    }),
  },
  {
    check: (value1, value2) => _.isUndefined(value1) && !_.isUndefined(value2),
    status: (value1, value2) => ({
      old: value1,
      newValue: value2,
      children: _.isObject(value2) && getChildren(value2),
      type: types.ADD,
    }),
  },
  {
    check: (value1, value2) => !_.isEqual(value1, value2),
    status: (value1, value2) => ({
      old: value1,
      newValue: value2,
      type: types.CHANGE,
    }),
  },
  {
    check: (value1, value2) => _.isEqual(value1, value2),
    status: (value1) => ({
      old: value1,
      type: types.UNCHANGE,
    }),
  },
];

const diff = (entriesValue1, entriesValue2) => {
  const iter = (file1, file2) => {
    const keys = _.union(Object.keys(file1), Object.keys(file2));
    const sortedKeys = _.sortBy(keys);
    return sortedKeys.map((key) => {
      const value1 = file1[key];
      const value2 = file2[key];

      const { status } = dictionary.find(({ check }) => check(value1, value2));

      return { key, ...status(value1, value2, iter) };
    });
  };
  return iter(entriesValue1, entriesValue2);
};
export default diff;
