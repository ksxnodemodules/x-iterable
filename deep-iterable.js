
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
			if (isIterable(base) && deeper(base, this)) {
				for (let element of base) {
					yield * new DeepIterable(element, deeper);
				}
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
			return typeof string === 'string' ? string.length > 1 : true;
		}

		static CHAR_DEEPER(string) {
			return typeof string === 'string' ? string.length !== 1 : true;
		}

		static LENGTHINESS_DEEPER(lengthiness) {
			return lengthiness.length > 1;
		}

	}

	module.exports = createClass(DeepIterable);

	DeepIterable.DEFAULT_DEEPER = DeepIterable.OBJECT_DEEPER;

	DeepIterable.Circular = createClass(class extends Root {

		constructor(base, deeper, equal, circular) {
			super();
			this.base = base;
			this.deeper = typeof deeper === 'function' ? deeper : DeepIterable.DEFAULT_DEEPER;
			this.equal = typeof equal === 'function' ? equal : Object.is;
			this.circular = typeof circular === 'function' ? circular : DeepIterable.Circular.DEFAULT_CIRCULAR_HANDLER;
		}

		[Symbol.iterator]() {
			var parents = [];
			var circular = this.circular;
			return iterate(this.base, this.deeper, this.equal);
			function * iterate(base, deeper, equal) {
				if (isIterable(base) && deeper(base, this)) {
					if (parents.find((element) => equal(base, element))) {
						yield circular(base, this);
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
