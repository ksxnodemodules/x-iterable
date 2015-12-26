
function main() {
	'use strict';

	var createClass = require('x-iterable').createClass;

	var Class = createClass();

	return {
		'Class': Class,
		'example': new Class(23, -4, 65, 6),
		'fromGenerator': require('./from-generator.js')
	};

}

module.exports = main();
