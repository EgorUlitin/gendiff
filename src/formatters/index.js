import stylish from './stylish.js';
import plain from './plain.js';
import json from './toJson.js';

const formatter = {
  stylish,
  plain,
  json,
};

export default (format) => formatter[format];
