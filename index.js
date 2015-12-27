
((module) => {
	'use strict';

	module.exports = {
		DeepIterable: require('./deep-iterable.js'),
		ProductIterable: require('./product-iterable.js'),
		ParallelIterable: require('./parallel-iterable.js'),
		createClass: require('./create-class.js'),
		root: require('./root.js'),
		utils: require('./utils')
	};

})(module);
