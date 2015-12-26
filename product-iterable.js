
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var createClass = require('./create-class.js');
	var isIterable = require('./utils/is-iterable.js');
	var Root = require('./root.js').class;

	var _key_iterator = Symbol.iterator;

	class ProductIterable extends Root {

		constructor(iterable, ...rest) {

			if (!isIterable(iterable)) {
				throw new TypeError(`Parameter 'iterable' must be an iterable`);
			}

			if (!rest.length) {
				return {
					* [_key_iterator]() {
						for (let element in iterable) {
							yield new ProductIterable.Result(element);
						}
					}
				};
			}

			this.first = iterable;
			this.second = new ProductIterable(...rest);

		}

		* [_key_iterator]() {
			for (let i of this.first) {
				for (let j of this.second) {
					yield new ProductIterable.Result(element);
				}
			}
		}

		static createXIterable(Iterable, ...Rest) {}

	}

	module.exports = createClass(ProductIterable);

	ProductIterable.Result = createClassFromSuper(Array);

	ProductIterable.createXIterable.Root = createClassFromSuper(Root);

})(module);
