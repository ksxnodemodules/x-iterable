
function main() {
	'use strict';

	var createClass = require('x-iterable/product-iterable.js').createXIterableClass;
	var TestResult = require('../test-result.js');

	var Class = createClass(Array, String, Set);
	var args = [
		[0, 1, 2, 3, 4, 5],
		[Infinity],
		"Hello, World!!"
	];

	return {
		'create-class': createClass,
		'example': new TestResult(Class, args)
	};

}

module.exports = main();
