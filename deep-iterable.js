
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super.handleArgs;
	var createClass = require('./create-class.js');
	var isIterable = require('./utils/is-iterable.js');
	var Root = require('./root.js').class;

	const EMPTY_ITERABLE = require('./utils/empty-iterable.js');
	const EMPTY_GENERATOR = EMPTY_ITERABLE.EMPTY_GENERATOR;

	var _key_iterator = Symbol.iterator;

	class DeepIterable extends Root {

		constructor(base, deeper, shallower) {
			super();
			this.base = base;
			this.deeper = typeof deeper === 'function' ? deeper : DeepIterable.DEFAULT_DEEPER;
			this.shallower = typeof shallower === 'function' ? shallower : DeepIterable.DEFAULT_SHALLOWER;
		}

		* [_key_iterator]() {
			var deeper = this.deeper;
			var base = this.base;
			var shallower = this.shallower;
			if (isIterable(base) && deeper(base, this)) {
				for (let element of base) {
					yield * new DeepIterable(element, deeper, shallower);
				}
				shallower(base, this);
			} else {
				yield base;
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
	DeepIterable.DEFAULT_SHALLOWER = (() => {});

	DeepIterable.PreProcessed = createClass.fromGenerator((base, preprocess, ...args) => {

		var iterate = (object) =>
			new Export((preprocess(object) || EMPTY_ITERABLE), ...args)
				.transform(iterate);

		return iterate(base)[_key_iterator]();

	});

	DeepIterable.Circular = createClass(class extends Root {

		constructor(base, deeper, equal, circular) {
			super();
			this.base = base;
			this.deeper = typeof deeper === 'function' ? deeper : DeepIterable.DEFAULT_DEEPER;
			this.equal = typeof equal === 'function' ? equal : Object.is;
			this.circular = typeof circular === 'function' ? circular : DeepIterable.Circular.DEFAULT_CIRCULAR_HANDLER;
		}

		[Symbol.iterator]() {
			var self = this;
			var parents = [];
			var circular = self.circular;
			return iterate(self.base, self.deeper, self.equal);
			function * iterate(base, deeper, equal) {
				if (isIterable(base) && deeper(base, self)) {
					if (parents.find((element) => equal(base, element))) {
						yield * circular(base, self) || EMPTY_GENERATOR;
					} else {
						parents.push(base);
						for (let element of base) {
							yield * iterate(element, deeper, equal);
						}
						parents.pop();
					}
				} else {
					yield base;
				}
			}
		}

		static DEFAULT_CIRCULAR_HANDLER(object) {
			return object;
		}

	});

})(module);
