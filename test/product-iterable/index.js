
function main() {
	'use strict';

	var ProductIterable = require('x-iterable/product-iterable.js');
	var TestResult = require('../test-result.js');

	var args = [
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		['a', 'b', 'c', 'd', 'e', 'f'],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(String),
		['a', 'b', 'c', 'd', 'e', 'f'].map(Symbol)
	];

	return {
		'test-args': args,
		'example': new TestResult(ProductIterable, args)
	};

}

module.exports = main();
