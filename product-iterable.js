
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var createClass = require('./create-class.js');
	var isIterable = require('./utils/is-iterable.js');
	var Root = require('./root.js').class;
	var recursiveConstructor = require('./utils/recursive-constructor.js');

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

		static createXIterable(...classes) {
			return createClass(class extends ProductIterable.createXIterable.Root {

				constructor(...args) {
					this.args = args;
				}

				* [_key_iterator]() {

				}

			});
		}

	}

	module.exports = createClass(ProductIterable);

	ProductIterable.Result = createClassFromSuper(Array);

	ProductIterable.createXIterable.Root = createClassFromSuper(Root);

})(module);
