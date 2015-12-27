
function main() {
	'use strict';

	var ParallelIterable = require('x-iterable/parallel-iterable.js');
	var TestResult = require('../test-result.js');

	var args = [
		ParallelIterable.END_OF_SOME,
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		['a', 'b', 'c', 'd', 'e', 'f']
	];

	return {
		'test-args': args,
		'example': new TestResult(ParallelIterable, args),
		'create-x-iterable-class': require('./create-x-iterable-class.js')
	};

}

module.exports = main();
