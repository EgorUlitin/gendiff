import _ from 'lodash';
import types from '../helpers/types.js';

const TAB = ' ';
const spacesCount = 4;

const showValue = (value, iter, counter) => `${_.isObject(value) ? iter(value, counter) : value}`;
const showReplacer = (counter) => TAB.repeat(spacesCount * counter - 2);

const dictionary = {
  [types.NODE]: (value, counter, iter) => `${showReplacer(counter)}  ${value.key}: ${iter(value.children, counter + 1)}`,
  [types.ADD]: (value, counter, iter) => `${showReplacer(counter)}+ ${value.key}: ${showValue(value.newValue, iter, counter + 1)}`,
  [types.REMOVE]: (value, counter, iter) => `${showReplacer(counter)}- ${value.key}: ${showValue(value.old, iter, counter + 1)}`,
  [types.CHANGE]: (value, counter, iter) => `${showReplacer(counter)}- ${value.key}: ${showValue(value.old, iter, counter + 1)}\n${showReplacer(counter)}+ ${value.key}: ${showValue(value.newValue, iter, counter + 1)}`,
  [types.UNCHANGE]: (value, counter) => `${showReplacer(counter)}  ${value.key}: ${value.old}`,
};

const stylish = (diff) => {
  // console.log(JSON.stringify(diff, null, '   '));

  const iter = (node, counter) => {
    if (_.isArray(node)) {
      return `{\n${node.map((value) => dictionary[value.type](value, counter, iter)).join('\n')}\n${TAB.repeat(spacesCount * counter - 4)}}`;
    }
    const entries = Object.entries(node);
    return `{\n${entries.map(([key, value]) => `${TAB.repeat(spacesCount * counter - 2)}  ${key}: ${_.isObject(value) ? iter(value, counter + 1) : value}`).join('\n')}\n${TAB.repeat(spacesCount * counter - 4)}}`;
  };
  return iter(diff, 1);
};
export default stylish;
