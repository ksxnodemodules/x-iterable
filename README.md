
# Extensible Iterable class utilities

## Examples

### Create an iterable class

 - Function: `createClass`

 - Usage: `createClass(optional class Super)`

```javascript
var createClass = require('x-iterable').createClass;
var base = createClass.fromGenerator(function * () {
	yield * "Hello, World!!";
});
var Iterable = createClass(base);
var iterable = new Iterable();
for (let element of iterable) {
	console.log(element); // display each character of "Hello, World!!"
}
```

### Find min, max of an iterable

 - Method: `get Iterable::max`, `get Iterable::min`

*They're two applications of method `Iterable::most()`*

```javascript
var SubSet = require('x-iterable').createClass(Set);
var set = new SubSet(12, 3, -5, 6, 88, 1);
console.log({
	min: set.min,
	max: set.max
});
```
