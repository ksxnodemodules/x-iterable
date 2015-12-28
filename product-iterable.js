
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

		static times(...args) {
			return ProductIterable.pow(...args);
		}

		static pow(iterable, exponent) {
			exponent = parseInt(exponent);
			if (exponent < 0) {
				throw new RangeError(`Parameter 'exponent' is invalid`);
			}
			if (!exponent) {
				return new ProductIterable([]);
			}
			var args = [];
			for ( ; exponent; --exponent) {
				args.push(iterable);
			}
			return new ProductIterable(...args);
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
