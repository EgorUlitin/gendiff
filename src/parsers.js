import yaml from 'js-yaml';

export default (data, type) => (type === 'json' ? JSON.parse(data) : yaml.load(data));
