
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var createClass = require('./create-class.js');
	var ParallelIterable = require('./parallel-iterable.js');
	var isIterable = require('./utils/is-iterable.js');
	var Root = require('./root.js').class;
	var recursiveConstructor = require('./utils/recursive-constructor.js');
	var parallelConstructor = require('./utils/parallel-constructor.js');

	var _key_iterator = Symbol.iterator;

	class ProductIterable extends Root {

		constructor(...args) {
			super();
			return recursiveConstructor(this, ProductIterable, ...args);
		}

		* [_key_iterator]() {
			for (let i of this.first) {
				for (let j of this.second) {
					yield new ProductIterable.Result(i, ...j);
				}
			}
		}

		static createXIterableClass(...classes) {
			return createClass(class extends ProductIterable.createXIterableClass.Root {

				constructor(...args) {
					super();
					this.iterables = parallelConstructor(classes, args);
				}

				* [_key_iterator]() {
					yield * new ProductIterable(...this.iterables);
				}

			});
		}

	}

	module.exports = createClass(ProductIterable);

	ProductIterable.Result = createClassFromSuper(Array);

	ProductIterable.createXIterableClass.Root = createClassFromSuper(Root);

})(module);
