#!/usr/bin/env node

import program from 'commander';
import getFile from '../src/helpers/getFile.js';
import gendiff from '../src/gendiff.js';
import stylish from '../src/stylish.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'diff')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    // const firstFile = getObj(getFilePath(filepath1));
    // const secondFile = getObj(getFilePath(filepath2));
    const firstFile = getFile(filepath1);
    const secondFile = getFile(filepath2);
    const data = gendiff(firstFile, secondFile);
    console.log(stylish(data));
  })
  .parse();
