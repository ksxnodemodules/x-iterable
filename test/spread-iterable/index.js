
function main() {
	'use strict';

	var SpreadIterable = require('x-iterable/spread-iterable.js');
	var TestResult = require('../test-result.js');

	var base = ['abc', 'def', 'ghi'];

	return {
		'base': base,
		'example': new TestResult(SpreadIterable, [base]),
		'create-x-iterable-class': require('./create-x-iterable-class.js')
	};

}

module.exports = main();
