import yaml from 'js-yaml';
import path from 'path';

export default (filepath, file) => {
  const format = path.extname(filepath);

  const parse = format === '.json' ? JSON.parse(file) : yaml.load(file);
  // let parse;
  // if (format === '.json') {
  //   parse = JSON.parse(file);
  // } else if (format === '.yml' || format === '.yaml') {
  //   parse = yaml.load(file);
  // }
  return parse;
};
