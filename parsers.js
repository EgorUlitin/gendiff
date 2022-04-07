import yaml from 'js-yaml';
import path from 'path';

export default (filepath, file) => {
  const format = path.extname(filepath);

  let parse;
  if (format === '.json') {
    parse = JSON.parse(file);
  } else if (format === '.yml') {
    parse = yaml.load(file);
  }
  return parse;
};
