
((module) => {
	'use strict';

	module.exports = {
		ConcatIterable: require('./concat-iterable.js'),
		DeepIterable: require('./deep-iterable.js'),
		ParallelIterable: require('./parallel-iterable.js'),
		ProductIterable: require('./product-iterable.js'),
		createClass: require('./create-class.js'),
		root: require('./root.js'),
		utils: require('./utils')
	};

})(module);
