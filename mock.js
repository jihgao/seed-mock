#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const fs = require('fs');
const parser = require('./lib/parser');
program
  .version('0.0.1')
  .description('Fake package manager')
  .option('-s, --seed [seed]', 'Seed String')
  .option('-o, --output [output]', 'Output file path')
  .option('-p, --pretty [space]', 'Pretty output')
  .parse(process.argv);

if (program.seed){
  const result = JSON.stringify(parser(program.seed), null, parseInt(program.pretty) || 0);  
  if (program.output) {
    fs.writeFileSync(path.resolve(program.output), result, 'utf-8');
  }
  console.log(result);
}