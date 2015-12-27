
function main() {
	'use strict';

	return {
		'x-iterable': require('./x-iterable'),
		'deep-iterable': require('./deep-iterable'),
		'product-iterable': require('./product-iterable'),
		'parallel-iterable': require('./parallel-iterable'),
		'main-module': require('..')
	}

}

module.exports = main();
