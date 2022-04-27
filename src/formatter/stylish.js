import _ from 'lodash';
import types from '../helpers/types.js';

const TAB = ' ';
const spacesCount = 4;

const getReplacer = (counter) => TAB.repeat(spacesCount * counter - 2);

const stringify = (node, counter) => {
  if (!_.isObject(node)) {
    return node;
  }
  const entries = Object.entries(node);
  return `{\n${entries.map(([key, value]) => `${getReplacer(counter)}  ${key}: ${stringify(value, counter + 1)}`).join('\n')}\n${TAB.repeat(spacesCount * counter - 4)}}`;
};

const dictionary = {
  [types.NODE]: (node, counter, iter) => `${getReplacer(counter)}  ${node.key}: {\n${node.children.flatMap((child) => iter(child, counter + 1)).join('\n')}\n${TAB.repeat(spacesCount * counter)}}`,
  [types.ADD]: (node, counter) => `${getReplacer(counter)}+ ${node.key}: ${stringify(node.value2, counter + 1)}`,
  [types.REMOVE]: (node, counter) => `${getReplacer(counter)}- ${node.key}: ${stringify(node.value1, counter + 1)}`,
  [types.CHANGE]: (node, counter) => [
    `${getReplacer(counter)}- ${node.key}: ${stringify(node.value1, counter + 1)}`,
    `${getReplacer(counter)}+ ${node.key}: ${stringify(node.value2, counter + 1)}`,
  ],
  [types.UNCHANGE]: (node, counter) => `${getReplacer(counter)}  ${node.key}: ${node.value1}`,
  [types.ROOT]: (node, counter, iter) => `{\n${node.children.flatMap((child) => iter(child, counter)).join('\n')}\n${TAB.repeat(spacesCount * counter - 4)}}`,
};

const stylish = (diff) => {
  const iter = (node, counter) => dictionary[node.type](node, counter, iter);
  return iter(diff, 1);
};
export default stylish;
