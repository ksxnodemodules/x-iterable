
function main() {
	'use strict';

	var createClass = require('x-iterable').createClass;
	var TestResult = require('../test-result.js');

	var Class = createClass();
	var args = [[23, -4, 65, 6]];

	return {
		'example': new TestResult(Class, args),
		'fromGenerator': require('./from-generator.js')
	};

}

module.exports = main();
