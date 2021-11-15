#!/usr/bin/env node
//import { Command } from 'commander/esm.mjs';
import program from 'commander';
//const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  //.option('-h, --help', 'output usage information')
  //.option('-v, --version', 'output the version number')

program.parse()