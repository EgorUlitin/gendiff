import _ from 'lodash';
import types from '../helpers/types.js';

const prepareParents = (parents) => parents.filter((item) => item !== '').join('.');

const stringify = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const dictionary = {
  [types.ADD]: (value, iter, parents) => `Property '${prepareParents(parents)}' was added with value: ${stringify(value.value2)}`,
  [types.NODE]: (value, iter, parents) => iter(value, parents),
  [types.REMOVE]: (value, iter, parents) => `Property '${prepareParents(parents)}' was removed`,
  [types.CHANGE]: (value, iter, parents) => `Property '${prepareParents(parents)}' was updated. From ${stringify(value.value1)} to ${stringify(value.value2)}`,
};

const plain = (diff) => {
  const iter = (node, parent = '') => {
    if (_.isArray(node)) {
      return node
        .filter((item) => item.type !== 'unchange')
        .map((item) => {
          const parents = item.type !== 'node' ? [...parent, item.key] : [...parent];

          return dictionary[item.type](item, iter, parents);
        })
        .join('\n');
    }
    const [key,, children] = Object.keys(node);
    const parents = [...parent, node[key]];

    return iter(node[children], parents);
  };
  return iter(diff);
};

export default plain;
