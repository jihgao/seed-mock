# mock
A very simple generator of mock data

## Schema pattern

```
<field1>:<field1_type=number|string|null|bool|bool!|array(<len>)|object{prop1:number|string|array|object, prop2:number|string|null|bool|bool!|array|object}>[,<field2>:<field2_type=number|string|null|bool|bool!|array|object>]
```

## Usage

### Use as node module

```javascript
const mock = require('seed-mock');
const seed= 'name:string,category:array(5)[number],data:object{name:string,age:number},count:number';
console.log(mock(seed));
```

For more examples, please refer to `test.js`

### Use as command

- Generating mock data from seed schema
  ```sh
  seed-mock -s name:string,category:array(5)[number],data:object{name:string,age:number},count:number
  ```
- Pretty output data with `-pretty [spaces]` or `-p [spaces]` or `-p`

  - [spaces]: JSON spaces, default is 2

- Write the output data to local file with `-output <file path>`


## Test With live app

[https://cryptic-ridge-84808.herokuapp.com?seed=id:number,name:string,category:object{id:number,name:string},data:array(4)[number]](https://cryptic-ridge-84808.herokuapp.com?seed=id:number,name:string,category:object{id:number,name:string},data:array(4)[number])


## Change Log

- 2019-07-12 00:06:45 
  - Add supports for `undefined`,`bool`,`bool!` and `null` type
  - Add supports for `array(5)[number|string|....]`、`object{field:number, field2:string....}` and `string`、`null`、`bool`、`bool!` those formats for generating mock directly
  