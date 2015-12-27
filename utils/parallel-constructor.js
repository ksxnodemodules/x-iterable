
((module) => {
	'use strict';

	var ParallelIterable = require('../parallel-iterable.js');

	module.exports = (classes, args) =>
		new ParallelIterable(ParallelIterable.END_OF_FIRST, classes, args)
			.map((param) => new param[0](param[1]));

})(module);
