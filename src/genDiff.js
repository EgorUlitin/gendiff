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

const genDiff = (entriesValue1, entriesValue2) => {
  const diff = (value1, value2) => {
    const keys = _.union(Object.keys(value1), Object.keys(value2)).sort();

    return keys.map((key) => {
      const currentValue1 = value1[key];
      const currentValue2 = value2[key];
      if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
        return {
          key,
          children: diff(currentValue1, currentValue2),
          type: types.NODE,
        };
      }
      if (!_.isUndefined(currentValue1) && _.isUndefined(currentValue2)) {
        return {
          key,
          old: currentValue1,
          newValue: currentValue2,
          children: _.isObject(currentValue1) && getChildren(currentValue1),
          type: types.REMOVE,
        };
      }
      if (_.isUndefined(currentValue1) && !_.isUndefined(currentValue2)) {
        return {
          key,
          old: currentValue1,
          newValue: currentValue2,
          children: _.isObject(currentValue2) && getChildren(currentValue2),
          type: types.ADD,
        };
      }
      if (!_.isEqual(currentValue1, currentValue2)) {
        return {
          key,
          old: currentValue1,
          newValue: currentValue2,
          type: types.CHANGE,
        };
      }
      if (_.isEqual(currentValue1, currentValue2)) {
        return {
          key,
          old: currentValue1,
          type: types.UNCHANGE,
        };
      }
    });
  };
  return diff(entriesValue1, entriesValue2);
};
export default genDiff;
