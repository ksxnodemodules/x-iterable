
function main() {
	'use strict';

	var createClass = require('x-iterable/concat-iterable.js').createXIterableClass;
	var TestResult = require('../test-result.js');

	var Class = createClass(Array, String, Set);
	var args = [
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		['abcdefghijklmnopqrstuvwxyz'],
		[Array.from("Hello, World!!")]
	];

	return {
		'create-class': createClass,
		'example': new TestResult(Class, args)
	};

}

module.exports = main();
