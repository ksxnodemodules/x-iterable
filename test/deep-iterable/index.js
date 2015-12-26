
function main() {
	'use strict';

	var DeepIterable = require('x-iterable/deep-iterable.js');
	var TestResult = require('../test-result.js');

	var base = [0, 1, [2, 3, 4, [5, 6, 7], 8], 9, 10, [11, 12, [13, 14], [[15], 16, [17]]], "text", ["foo", ["bar"]]];

	return {
		'base': base,
		'example': new TestResult(DeepIterable, [base])
	};

}

module.exports = main();
