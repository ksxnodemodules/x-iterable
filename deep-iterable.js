
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super.handleArgs;
	var compose = require('simple-function-utils/compose');
	var createClass = require('./create-class.js');
	var isIterable = require('./utils/is-iterable.js');
	var Root = require('./root.js').class;

	const EMPTY_ITERABLE = require('./utils/empty-iterable.js');
	const EMPTY_GENERATOR = EMPTY_ITERABLE.EMPTY_GENERATOR;

	var _key_iterator = Symbol.iterator;

	class DeepIterable extends Root {

		constructor(base, deeper, shallower, preprocess) {
			super();
			this.base = base;
			this.deeper = typeof deeper === 'function' ? deeper : DeepIterable.DEFAULT_DEEPER;
			this.shallower = typeof shallower === 'function' ? shallower : DeepIterable.DEFAULT_SHALLOWER;
			this.preprocess = typeof preprocess === 'function' ? preprocess : DeepIterable.DEFAULT_PREPROCESS;
		}

		* [_key_iterator]() {
			var deeper = this.deeper;
			var shallower = this.shallower;
			var preprocess = this.preprocess;
			var iterable = preprocess(this.base, this);
			if (isIterable(iterable) && deeper(iterable, this)) {
				for (let element of iterable) {
					yield * new DeepIterable(element, deeper, shallower, preprocess);
				}
				shallower(iterable, this);
			} else {
				yield iterable;
			}
		}

		circular(equal) {
			return new DeepIterable.Circular(this.base, this.deeper, equal);
		}

		static createXIterableClass(Base, deeper) {
			return createClassFromSuper(DeepIterable, (...args) => [new Base(...args), deeper]);
		}

		static ANY_DEEPER(iterable) {
			return true;
		}

		static OBJECT_DEEPER(object) {
			return typeof object === 'object';
		}

		static STRING_DEEPER(string) {
			return typeof string !== 'string' || string.length > 1;
		}

		static CHAR_DEEPER(string) {
			return typeof string !== 'string' || string.length !== 1;
		}

		static LENGTHINESS_DEEPER(lengthiness) {
			return lengthiness.length > 1;
		}

	}

	var Export = module.exports = createClass(DeepIterable);

	DeepIterable.DEFAULT_DEEPER = DeepIterable.OBJECT_DEEPER;
	DeepIterable.DEFAULT_SHALLOWER = () => {};
	DeepIterable.DEFAULT_PREPROCESS = (x) => x;

	DeepIterable.Circular = class extends DeepIterable {

		constructor(base, deeper, equal, circular, ...args) {

			deeper = compose();

		}

	}

	// DEFAULT_CIRCULAR_HANDLER

})(module);
