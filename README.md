
# Extensible Iterable class utilities

## Requirements

Node v5.0.0 or later
 - Flag `--es-staging` is required

## Some examples

 * Read [documentation](https://github.com/ksxnodemodules/x-iterable-documentation) for more examples

### For `require('x-iterable/create-class')`

#### Create an extended iterable class based on an iterable class

 - Function: [`createClass`](https://github.com/ksxnodemodules/x-iterable-documentation/blob/master/references/create-class/readme.md)

 - Usage: `createClass(optional class Super)`

```javascript
var createClass = require('x-iterable/create-class');
var Iterable = createClass(Int8Array);
var iterable = new Iterable([12, -4, 5, 66, 4]);
var strlist = iterable.map(String);
console.log(strlist);
```

#### Create an iterable class based on generator

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

### For `require('x-iterable/concat-iterable')`

#### Iterate elements of array + string + set

```javascript
var ConcatIterable = require('x-iterable/concat-iterable');
var concat = new ConcatIterable(
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	'abcdefghijklmnopqrstuvwxyz',
	new Set('Set')
);
console.log(Array.from(concat));
```

### For `require('x-iterable/deep-iterable')`

#### Iterate all non-iterable elements of an array

```javascript
var DeepIterable = require('x-iterable/deep-iterable');
var deep = new DeepIterable([0, 1, [[2, 3, [[4, 5], 6, 7]], 8, 9]]);
console.log(Array.from(deep));
```

### For `require('x-iterable/parallel-iterable')`

#### Iterate many iterables simultaneously

Get `[[A[0], B[0], C[0], ...], [A[1], B[1], C[1], ...], [A[2], B[2], C[2], ...], ...]` where `A`, `B`, `C`, ... are iterable

```javascript
var ParallelIterable = require('x-iterable/parallel-iterable');
var parallel = new ParallelIterable(
	ParallelIterable.END_OF_FIRST, // end of A
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // A
	'abcdefghi', // B
	new Set('987654321') // C
);
console.log(Array.from(parallel));
```

### For `require('x-iterable/product-iterable')`

#### Iterate all combinations of many iterables

Get a sequence of all `[A[i], B[j], C[k], ...]` where `A`, `B`, `C`, ... are iterable

```javascript
var ProductIterable = require('x-iterable/product-iterable');
var product = new ProductIterable(
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	['a', 'b', 'c', 'd', 'e', 'f'],
	['x', 'y', 'z'].map(Symbol)
);
console.log(Array.from(product));
```

### For `require('x-iterable/spread-iterable')`

#### Iterate children of children of an iterable

```javascript
var SpreadIterable = require('x-iterable/spread-iterable');
var grandchildren = new SpreadIterable([
	[23, 54, 23, 64],
	[11, 35, 66, 88],
	[42, 36, 22, 14]
]);
console.log(Array.from(grandchildren));
```

### For all

#### Find min, max of an iterable

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
