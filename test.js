#!/usr/bin/env node
const child_process = require('child_process');
const spawnSync = child_process.spawnSync;
const seed = 'name:string,category:array(5)[number],data:object{name:string,age:number},count:number';

console.log('Test with dummy -s ' + seed);
test('-s ' + seed);

console.log('Test with dummy -p 4 -s ' + seed);
test('-p 4 -s ' + seed);

console.log('Test with dummy -p 4 -s ' + seed + ' -o ./mock.json');
test('-p 4 -s ' + seed + ' -o ./mock.json ');

// Test function
function test(args, cb) {
  let result = null;
  try {
    result = spawnSync(
      'node',
      ['./seed-mock.js'].concat((args || '').split(/\s+/))
    ).stdout.toString();
    console.log(result);
  } catch (err) {
    console.error('ERROR ' + err);
  }
  if (typeof cb === 'function'){
    cb(args, result);
  }
}