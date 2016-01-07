
# Extensible Iterable class utilities

## Requirements

Node v5.0.0 or later
 - Flag `--es-staging` is required

## Some examples

 * Read [documentation](https://github.com/ksxnodemodules/x-iterable-documentation) for more examples

### Create an extended iterable class based on an iterable class

 - Function: [`createClass`](https://github.com/ksxnodemodules/x-iterable-documentation/blob/master/references/create-class/readme.md)

 - Usage: `createClass(optional class Super)`

```javascript
var createClass = require('x-iterable/create-class');
var Iterable = createClass(Int8Array);
var iterable = new Iterable([12, -4, 5, 66, 4]);
var strlist = iterable.map(String);
console.log(strlist);
```

### Create an iterable class based on generator

 - Function: [`createClass.fromGenerator`](https://github.com/ksxnodemodules/x-iterable-documentation/blob/master/references/create-class/readme.md#function-createclassfromgenerator)

 - Usage: `createClass.fromGenerator(function generator)`

```javascript
var createClass = require('x-iterable/create-class');
var Iterable = createClass.fromGenerator(function * () {
	yield * "Hello, World!!";
});
var iterable = new Iterable();
for (let element of iterable) {
	console.log(element); // display each character of "Hello, World!!"
}
```

### Find min, max of an iterable

 - Method: `get Iterable::max`, `get Iterable::min`

*They're two applications of method [`XIterable::most`](https://github.com/ksxnodemodules/x-iterable-documentation/blob/master/references/create-class/x-iterable.md#method-most)*

```javascript
var SubSet = require('x-iterable').createClass(Set);
var set = new SubSet([12, 3, -5, 6, 88, 1]);
console.log({
	min: set.min,
	max: set.max
});
```

## Documentation: User Manual, API References
 - [Documentation](https://github.com/ksxnodemodules/x-iterable-documentation)
