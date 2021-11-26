import types from '../helpers/types.js';

const TAB = '    ';
const TAB_LEVEL = 1;

const dictionary = {
  [types.ADDED]: (node, level) => `${TAB.repeat(level)}+ ${node.key}: ${node.newValue}`,
  [types.REMOVED]: (node, level) => `${TAB.repeat(level)}- ${node.key}: ${node.oldValue}`,
  [types.UNCHANGED]: (node, level) => `${TAB.repeat(level)}  ${node.key}: ${node.oldValue}`,
  [types.CHANGED]: (node, level) => `${TAB.repeat(level)}- ${node.key}: ${node.oldValue}\n${TAB.repeat(level)}+ ${node.key}: ${node.newValue}}`,
  // eslint-disable-next-line no-use-before-define
  [types.NODE]: (node, level) => `${TAB.repeat(level)}  ${node.key}: ${diff(node.children, level + 1)}`,
};

function diff(data, level) {
  return `{\n${data.map((node) => dictionary[node.type](node, level)).join('\n')}\n${TAB.repeat(level - 1)}}`;
}

const stylish = (data) => diff(data, TAB_LEVEL);

export default stylish;
