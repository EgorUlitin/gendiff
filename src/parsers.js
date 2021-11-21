import path from 'path';
import yaml from 'js-yaml';

export default (file, filepath) => {
  const format = path.extname(filepath);
  let parse;
  if (format === '.json') {
    parse = JSON.parse(file);
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load(file);
  }
  return parse;
};
