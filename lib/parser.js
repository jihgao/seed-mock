const randomNames = require('rand-names');
const tokens = [":", ","];
const reg_arr = /^array\(([0-9]*)\)\[(\S+)\]$/;
const randomNumber = bit => Number(Math.random().toString().substr(-1 * Math.max(bit, 3)));
const isNumber = v => !!(typeof v === 'number');
const isString = v => !!(typeof v === 'string');
const isObject = v => !!(typeof v === 'object');
const isArray = v => Array.isArray(v);

function parse(token) {
  var next_token = '';
  var current_token = '';
  var property_name;
  var ret = {};
  var parsed_tokens = [];
  for (let i = 0, len = token.length; i < len; i++) {
    if (current_token.indexOf("{") > -1) {
      if (token[i] === "," && current_token.split("{").length === current_token.split("}").length) {
        parsed_tokens.push(current_token);
        current_token = "";
      } else {
        current_token += token[i];
      }
    } else if (tokens.indexOf(token[i]) === -1) {
      current_token += token[i];
    } else {
      parsed_tokens.push(current_token);
      current_token = "";
    }
  }

  if (current_token) {
    parsed_tokens.push(current_token);
  }
  let len2 = parsed_tokens.length;
  for (let k = 0; k < len2; k += 2) {
    property_name = parsed_tokens[k];
    next_token = parsed_tokens[k + 1];
    if (next_token === 'string') {
      ret[property_name] = randomNames.rand();
    } else if (next_token === 'number') {
      ret[property_name] = 1;
    } else if (reg_arr.test(next_token)) {
      ret[property_name] = parseArrayToken(next_token);
    } else if (next_token.startsWith('object{') && next_token.endsWith('}')) {
      ret[property_name] = parse(next_token.substr(7, next_token.length - 8));
    }
  }
  return ret;
}

function getArrayWithSomeDefaultValues(cnt, v) {
  var ret = [];
  cnt = Number(cnt) || 1;
  for (let i = 0; i < cnt; i++) {
    if (isNumber(v)) {
      ret.push(randomNumber(i));
    } else if (isString(v)) {
      ret.push(randomNames.rand());
    } else if (isArray(v)) {
      ret.push(reFormat(v));
    } else if (isObject(v)) {
      ret.push(randomForObject(v));
    } else {
      ret.push(v);
    }
  }

  return ret;
}

function randomForObject(obj) {
  var new_obj = {};
  for (let prop in obj) {
    if (isNumber(obj[prop])) {
      new_obj[prop] = randomNumber(4);
    } else if (isString(obj[prop])) {
      new_obj[prop] = randomNames.rand();
    } else if (isArray(obj[prop])) {
      new_obj[prop] = reFormat(obj[prop]);
    } else if (isObject(obj[prop])) {
      new_obj[prop] = randomForObject(obj[prop])
    }
  }
  return new_obj;
}

function reFormat(arr) {
  return arr.map(function (item, index) {
    if (typeof item === 'number') {
      return randomNumber(index);
    } else if (typeof item === 'string') {
      return randomNames.rand();
    } else if (Array.isArray(item)) {
      return reFormat(item);
    } else if (typeof item === 'object') {
      return randomForObject(item)
    } else {
      return item;
    }
  });
}

function parseArrayToken(token) {
  var matched = token.match(reg_arr),
    next_value,
    next_token,
    element_cnt,
    ret = [];
  if (matched) {
    element_cnt = Number(matched[1]) || 0;
    next_token = matched[2];
    if (next_token === 'number') {
      next_value = 1;
    } else if (next_token === 'string') {
      next_value = randomNames.rand();
    } else if (reg_arr.test(next_token)) {
      next_value = parseArrayToken(next_token);
    } else if (next_token.startsWith('object{') && next_token.endsWith('}')) {
      next_value = parse(next_token.substr(7, next_token.length - 8));
    }
    ret = getArrayWithSomeDefaultValues(element_cnt, next_value);
  }
  return ret;
}

module.exports = function (seed) {
  return parse(seed);
};