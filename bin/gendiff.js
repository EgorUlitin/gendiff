#!/usr/bin/env node
//import { Command } from 'commander/esm.mjs';
import program from 'commander';
//const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1> <filepath2>')
  .parse()