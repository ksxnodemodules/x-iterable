
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var recursiveConstructor = require('./utils/recursive-constructor.js');
	var ProductIterableSuper = require('./utils/appx-super-class.js')(build, iterate);
	var mostMatrix = require('./utils/most-matrix.js');

	class ProductIterable extends ProductIterableSuper {

		constructor(...args) {
			super(...args);
		}

		most(callback, init) {
			return mostMatrix(callback, this, init);
		}

	}

	module.exports = ProductIterable;

	ProductIterable.Result = createClassFromSuper(Array);

	function build(self, ...args) {
		return recursiveConstructor(self, ProductIterable, ...args);
	}

	function * iterate() {
		for (let i of this.first) {
			for (let j of this.second) {
				yield new ProductIterable.Result(i, ...j);
			}
		}
	}

})(module);
