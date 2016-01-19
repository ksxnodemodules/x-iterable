
function main() {
	'use strict';

	var Class = require('x-iterable/spread-iterable.js')
		.createXIterableClass(Array, Set, String, Int32Array);

	var TestResult = require('../test-result.js');

	var args = [
		[Array.from('Symbol').map(Symbol)],
		['Hello, World!!'],
		[[12, -55, 32.4, 36, -11.2]]
	];

	return {
		'example': new TestResult(Class, args)
	};

}

module.exports = main();
