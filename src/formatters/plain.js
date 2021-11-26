import _ from 'lodash';
import types from '../helpers/types.js';

const complexValue = '[complex value]';
const putDot = (node) => `${(node ? '.' : '')}`;
const showAsString = (key) => `${typeof key === 'string' ? `'${key.toString()}'` : key}`;

const dictionary = {
  [types.ADDED]: (node, parents) => `Property '${parents}${putDot(parents)}${node.key}' was added with value: ${_.isObject(node.newValue) ? complexValue : showAsString(node.newValue)}`,
  [types.REMOVED]: (node, parents) => `Property '${parents}${putDot(parents)}${node.key}' was removed`,
  [types.CHANGED]: (node, parents) => `Property '${parents}${putDot(parents)}${node.key}' was updated. From ${_.isObject(node.oldValue) ? complexValue : showAsString(node.oldValue)} to ${showAsString(node.newValue)}`,
  // eslint-disable-next-line no-use-before-define
  [types.NODE]: (node, parents) => `${getdiff(node.children, `${parents}${putDot(parents)}${node.key}`)}`,
};

function getdiff(data, parent) {
  return `${data
    .filter((node) => node.type !== 'unchanged')
    .map((node) => dictionary[node.type](node, parent)).join('\n')}`;
}

const plain = (data, parent = '') => getdiff(data, parent);

export default plain;
