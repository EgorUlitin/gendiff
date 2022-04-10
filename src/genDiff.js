import _ from 'lodash';

const types = {
  NODE: 'node',
  REMOVE: 'remove',
  ADD: 'add',
  CHANGE: 'change',
  UNCHANGE: 'unchange',
};

const getChildren = (data) => {
  const children = [];

  if (_.isObject(data)) {
    const values = Object.values(data);
    return values.map((child) => {
      if (_.isObject(child)) {
        getChildren(child);
      } else {
        children.push(child);
      }
    });
  }
  return children;
};

const genDiff = (entriesValue1, entriesValue2) => {
  const diff = (value1, value2) => {
    const keys = _.union(Object.keys(value1), Object.keys(value2)).sort();

    const result = keys.map((key) => {
      const currentValue1 = value1[key];
      const currnetValue2 = value2[key];

      if (_.isObject(currentValue1) && _.isObject(currnetValue2)) {
        return {
          key,
          children: diff(currentValue1, currnetValue2),
          type: types.NODE,
        };
      }
      if (!_.isUndefined(currentValue1) && _.isUndefined(currnetValue2)) {
        return {
          key,
          old: currentValue1,
          new: currnetValue2,
          children: getChildren(currentValue1),
          type: types.REMOVE,
        };
      }
      if (_.isUndefined(currentValue1) && !_.isUndefined(currnetValue2)) {
        return {
          key,
          old: currentValue1,
          new: currnetValue2,
          children: getChildren(currnetValue2),
          type: types.ADD,
        };
      }
      if (!_.isEqual(currentValue1, currnetValue2)) {
        return {
          key,
          old: currentValue1,
          new: currnetValue2,
          children: getChildren(currnetValue2),
          type: types.CHANGE,
        };
      }
      if (_.isEqual(currentValue1, currnetValue2)) {
        return {
          key,
          old: currentValue1,
          children: getChildren(currentValue1),
          type: types.UNCHANGE,
        };
      }
    });
    // console.log(JSON.stringify(result[0], null, '  '));
    return result;
  };
  return diff(entriesValue1, entriesValue2);
};
export default genDiff;
