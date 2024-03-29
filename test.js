#!/usr/bin/env node
const child_process = require('child_process');
const spawnSync = child_process.spawnSync;
const seed = 'name:string,count:number,category:array(5)[number],data:object{field_string:string,field_number:number,field_array:array(1)[string],field_null:null,field_undefined:undefined,field_bool_true:bool,field_bool_false:bool!}';

test('-s array(5)[number]');
test('-s object{field_string:string,field_number:number,field_array:array(1)[string],field_null:null,field_undefined:undefined,field_bool_true:bool,field_bool_false:bool!}');
test('-p 4 -s ' + seed);
test('-p 4 -s ' + seed);
test('-p 4 -s ' + seed + ' -o ./mock.json ');

// Test function
function test(args, cb) {
  let result = null;
  console.log(`Test width ${args}`);
  console.log();
  console.log();
  try {
    result = spawnSync(
      'node',
      ['./seed-mock.js'].concat((args || '').split(/\b\s+/))
    ).stdout.toString();
    console.log(result);
  } catch (err) {
    console.error('ERROR ' + err);
  }
  console.log();
  if (typeof cb === 'function'){
    cb(args, result);
  }
}