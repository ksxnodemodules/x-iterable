
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super.handleArgs;
	var createClass = require('./create-class.js');
	var isIterable = require('./utils/is-iterable.js');
	var Root = require('./root.js').class;

	var _key_iterator = Symbol.iterator;

	class DeepIterable extends Root {

		constructor(base, deeper) {
			super();
			this.base = base;
			this.deeper = typeof deeper === 'function' ? deeper : DeepIterable.DEFAULT_DEEPER;
		}

		* [_key_iterator]() {
			var deeper = this.deeper;
			var base = this.base;
			if (deeper(base, this)) {
				for (let element of base) {
					yield * new DeepIterable(element, deeper);
				}
			} else {
				yield base;
			}
		}

		static createXIterableClass(Base, deeper) {
			return createClassFromSuper(DeepIterable, (...args) => [new Base(...args), deeper]);
		}

		static DEFAULT_DEEPER(object) {
			return typeof object === 'object' && isIterable(object);
		}

		static get CIRCULAR_DEEPER() {
			var all = new Set();
			return (object) => !all.has(object) && all.add(object);
		}

	}

	module.exports = createClass(DeepIterable);

})(module);
