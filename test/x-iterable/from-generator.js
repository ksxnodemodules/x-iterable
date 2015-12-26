
function main() {
	'use strict';

	var createClass = require('x-iterable').createClass.fromGenerator;
	var TestResult = require('../test-result.js');

	var Class = createClass(gen);
	var args = [12, 23, 54, 8, 3, 45];

	return {
		'Class': Class,
		'gen': gen,
		'example': new TestResult(Class, args)
	};

	function * gen(...args) {
		yield * args;
	}

}

module.exports = main();
