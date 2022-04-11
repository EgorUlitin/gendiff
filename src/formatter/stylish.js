import _ from 'lodash';
import types from '../helpers/types.js';

const TAB = ' ';
const spacesCount = 4;

const dic = {
  [types.NODE]: (value, counter, iter) => `${TAB.repeat(spacesCount * counter - 2)}  ${value.key}: ${iter(value.children, counter + 1)}`,
  [types.ADD]: (value, counter, iter) => `${TAB.repeat(spacesCount * counter - 2)}+ ${value.key}: ${_.isObject(value.newValue) ? iter(value.newValue, counter + 1) : value.newValue}`,
  [types.REMOVE]: (value, counter) => `${TAB.repeat(spacesCount * counter - 2)}- ${value.key}: ${value.old}`,
  [types.CHANGE]: (value, counter) => `${TAB.repeat(spacesCount * counter - 2)}- ${value.key}: ${value.old}\n${TAB.repeat(spacesCount * counter - 2)}+ ${value.key}: ${value.newValue}`,
  [types.UNCHANGE]: (value, counter) => `${TAB.repeat(spacesCount * counter - 2)}  ${value.key}: ${value.old}`,
};

const stylish = (diff) => {
  console.log(JSON.stringify(diff, null, '   '));

  const iter = (node, counter) => {
    const values = Object.values(node);
    return `{\n${values.map((value) => dic[value.type](value, counter, iter)).join('\n')}\n${TAB.repeat(spacesCount * counter - 4)}}`;
  };
  return iter(diff, 1);
};
export default stylish;
