import _ from 'lodash';
import types from '../helpers/types.js';

const TAB = ' ';
const spacesCount = 4;

const getReplacer = (counter) => TAB.repeat(spacesCount * counter - 2);

const stringify = (node, iter, counter) => {
  if (!_.isObject(node)) {
    return node;
  }
  const entries = Object.entries(node);
  return `{\n${entries.map(([key, value]) => `${getReplacer(counter)}  ${key}: ${stringify(value, iter, counter + 1)}`).join('\n')}\n${TAB.repeat(spacesCount * counter - 4)}}`;
};

const dictionary = {
  [types.NODE]: (node, counter, iter) => `${getReplacer(counter)}  ${node.key}: ${iter(node.children, counter + 1)}`,
  [types.ADD]: (node, counter, iter) => `${getReplacer(counter)}+ ${node.key}: ${stringify(node.value2, iter, counter + 1)}`,
  [types.REMOVE]: (node, counter, iter) => `${getReplacer(counter)}- ${node.key}: ${stringify(node.value1, iter, counter + 1)}`,
  [types.CHANGE]: (node, counter, iter) => [
    `${getReplacer(counter)}- ${node.key}: ${stringify(node.value1, iter, counter + 1)}`,
    `${getReplacer(counter)}+ ${node.key}: ${stringify(node.value2, iter, counter + 1)}`,
  ],
  [types.UNCHANGE]: (node, counter) => `${getReplacer(counter)}  ${node.key}: ${node.value1}`,
  [types.ROOT]: (node, counter, iter) => `\n${node.children.map((child) => iter(child, counter).join('\n'))}`,
};

const stylish = (diff) => {
  const iter = (node, counter) => `{\n${node.children.flatMap((value) => dictionary[value.type](value, counter, iter)).join('\n')}\n${TAB.repeat(spacesCount * counter - 4)}}`;
  return iter(diff, 1);
};
export default stylish;
