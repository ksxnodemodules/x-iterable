
function main() {
	'use strict';

	var Class = require('x-iterable/deep-iterable.js').createXIterableClass(Array);
	var TestResult = require('../test-result.js');

	var args = [
		[0, 1, 2, [3, 4, [5]], [6, 7], [[8], 9], [[10, 11], 12]],
		[['a', 'b'], 'c', 'd', ['e', 'f', 'g'], ['h', ['i'], 'j']]
	];

	return {
		'example': new TestResult(Class, args)
	};

}

module.exports = main();
