import _ from 'lodash';
import types from '../helpers/types.js';

const TAB = '    ';
const TAB_LEVEL = 1;

function showValue(value, level) {
  console.log(value);
  //return `${_.isObject(value) ? `{\n${TAB.repeat(level + 1)}  ${children.map(([k, v]) => `${k}: ${v}`)}\n${TAB.repeat(level)}  }` : value}`;
  const arr = _.isObject(value) && Object.entries(value);
  return `${_.isObject(value) ? `{  ${arr.map(([k, v]) => `\n${TAB.repeat(level + 1)}${k}: ${showValue(v, level + 1)}`)}\n${TAB.repeat(level)}  }` : `${value}`}`;
}

const dictionary = {
  [types.ADDED]: ({ key, newValue, children }, level) => `${TAB.repeat(level)}+ ${key}: ${showValue(newValue, level, children)}`,
  [types.REMOVED]: ({ key, oldValue, children }, level) => `${TAB.repeat(level)}- ${key}: ${showValue(oldValue, level, children)}`,
  [types.UNCHANGED]: ({ key, oldValue, children }, level) => `${TAB.repeat(level)}  ${key}: ${oldValue}`,
  [types.CHANGED]: ({ key, oldValue, newValue, children }, level) => `${TAB.repeat(level)}- ${key}: ${showValue(oldValue, level, children)}\n${TAB.repeat(level)}+ ${key}: ${showValue(newValue, level, children)}`,
  // eslint-disable-next-line no-use-before-define
  [types.NODE]: (node, level) => `${TAB.repeat(level)}${node.key}: ${diff(node.children, level + 1)}`,
};

function diff(data, level) {
  return `{\n${data.map((node) => dictionary[node.type](node, level)).join('\n')}\n${TAB.repeat(level - 1)}}`;
}

const stylish = (data) => diff(data, TAB_LEVEL);

export default stylish;
