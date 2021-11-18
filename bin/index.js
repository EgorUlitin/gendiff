#!/usr/bin/env node

import program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { getFilePath, getObj } from './helpers.js'

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  // .action((filepath1, filepath2) => {
  //   const firstFile = getObj(getFilePath(filepath1))
  //   const secondFile = getObj(getFilePath(filepath2))
    
  // })
  .parse()