# mock
A very simple generator of mock data

## Schema pattern

```
<field1>:<field1_type=number|string|array(<len>)|object{prop1:number|string|array|object, prop2:number|string|array|object}>[,<field2>:<field2_type=number|string|array|object>]
```

## Usage

### Use as node module

```javascript
const mock = require('mock');
const seedSchema = 'name:string,category:array(5)[number],data:object{name:string,age:number},count:number';
console.log(mock(seedSchema));
```
### Use as command

- Generating mock data from seed schema
  ```sh
  dummy -s name:string,category:array(5)[number],data:object{name:string,age:number},count:number
  ```
- Pretty output data with `-pretty [spaces]` or `-p [spaces]` or `-p`

  - [spaces]: JSON spaces, default is 2

- Write the output data to local file with `-output <file path>`


## Test With live app

[https://cryptic-ridge-84808.herokuapp.com?seed=id:number,name:string,category:object{id:number,name:string},data:array(4)[number]](https://cryptic-ridge-84808.herokuapp.com?seed=id:number,name:string,category:object{id:number,name:string},data:array(4)[number])