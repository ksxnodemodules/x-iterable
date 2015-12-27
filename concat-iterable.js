
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var createClass = require('./create-class.js');
	var Root = require('./root.js').class;
	var recursiveConstructor = require('./utils/recursive-constructor.js');
	var parallelConstructor = require('./utils/parallel-constructor.js');

	var _key_iterator = Symbol.iterator;

	class ConcatIterable extends Root {

		constructor(...args) {
			super();
			return recursiveConstructor(this, ConcatIterable, ...args);
		}

		* [_key_iterator]() {
			yield * this.first;
			yield * this.second;
		}

		static createXIterableClass(...classes) {
			return createClass(class extends ConcatIterable.createXIterableClass.Root {

				constructor(...args) {
					super();
					this.iterables = new ConcatIterable(...parallelConstructor(classes, args));
				}

				* [_key_iterator]() {
					yield * this.iterables;
				}

			});
		}

	}

	module.exports = ConcatIterable;

	ConcatIterable.createXIterableClass.Root = createClassFromSuper(Root);

})(module);
