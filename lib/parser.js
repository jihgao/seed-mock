const randomNames = require('rand-names');
const tokens = [":", ","];
const reg_arr = /^array\(([0-9]*)\)\[(\S+)\]$/;
const randomNumber = bit => Number(Math.random().toString().substr(-1 * Math.max(bit, 3)));
const isNumber = v => !!(typeof v === 'number');
const isString = v => !!(typeof v === 'string');
const isObject = v => !!(typeof v === 'object');
const isNull = v => !!(v === null);
const isUndefined = v => !!(typeof v === 'undefined');
const isBool = v => !!(typeof v === 'boolean');
const isArray = v => Array.isArray(v);

function parse(token) {
  var next_token = '';
  var current_token = '';
  var property_name;
  var ret = {};
  var parsed_tokens = [];
  if(token){
    token = String(token).replace(' ','');
    token = token.trim();
  }
  for (let i = 0, len = token.length; i < len; i++) {
    if (current_token.indexOf("{") > -1) {
      if (token[i] === "," && current_token.split("{").length === current_token.split("}").length) {
        parsed_tokens.push(current_token);
        current_token = "";
      } else if (token[i] === ' ') {
        continue;
      } else {
        current_token += token[i];
      }
    } else if (tokens.indexOf(token[i]) === -1) {
      current_token += token[i];
    } else if (token[i] === ' '){
      continue;
    } else {
      parsed_tokens.push(current_token);
      current_token = "";
    }
  }

  if (current_token) {
    parsed_tokens.push(current_token);
  }

  let len2 = parsed_tokens.length;
  let isOdd = !!(len2 & 1);
  if (len2 && isOdd) {
    if (parsed_tokens[0].startsWith('object{') && !parsed_tokens[0].endsWith("}")){
      parsed_tokens[0] += '}';
    }
    ret = defaultValuesOfType(parsed_tokens[0]);
  } else {
    for (let k = 0; k < len2; k += 2) {
      property_name = parsed_tokens[k];
      next_token = parsed_tokens[k + 1];
      ret[property_name] = defaultValuesOfType(next_token);
    }
  }
  return ret;
}

function defaultValuesOfType (type) {
  let ret;
  if (type === 'string') {
    ret = randomNames.rand();
  } else if (type === 'number') {
    ret = randomNumber(Math.round(Math.random() * 3));
  } else if (reg_arr.test(type)) {
    ret = parseArrayToken(type);
  } else if (type.startsWith('object{') && type.endsWith('}')) {
    ret = parse(type.substr(7, type.length - 8));
  } else if (type === 'null') {
    ret = null;
  } else if (type === 'bool') {
    ret = true;
  } else if (type === 'bool!') {
    ret = false;
  } else {
    ret = undefined;
  }
  return ret;
}

function randomValue(seed) {
  if (isNumber(seed)) {
    return randomNumber(Math.round(Math.random() * 3));
  } else if (isString(seed)) {
    return randomNames.rand();
  } else if (isArray(seed)) {
    return seed.map(function (item, index) {
      return randomValue(item);
    });
  } else if (isObject(seed)) {
    return randomForObject(seed);
  } else if (isNull(seed)) {
    return seed;
  } else if (isUndefined(seed)) {
    return seed;
  } else if (isBool(seed)) {
    return seed;
  } else {
    return undefined;
  }
}

function getArrayWithSomeDefaultValues(cnt, v) {
  var ret = [];
  cnt = Number(cnt) || 1;
  for (let i = 0; i < cnt; i++) {
    ret.push(randomValue(v));
  }
  return ret;
}

function randomForObject(obj) {
  var new_obj = {};
  for (let prop in obj) {
    new_obj[prop] = randomValue(new_obj[prop]);
  }
  return new_obj;
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