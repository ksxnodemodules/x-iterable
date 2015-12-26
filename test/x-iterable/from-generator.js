
function main() {
	'use strict';

	var createClass = require('x-iterable').createClass.fromGenerator;

	var Class = createClass(gen);

	return {
		'Class': Class,
		'gen': gen,
		'example': new Class(12, 23, 54, 8, 3, 45)
	};

	function * gen(...args) {
		yield * args;
	}

}

module.exports = main();
