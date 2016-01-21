
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super.handleArgs;
	var bind = require('simple-function-utils/bind').begin;
	var createClass = require('./create-class.js');
	var isIterable = require('./utils/is-iterable.js');
	var Root = require('./root.js').class;

	const EMPTY_ITERABLE = require('./utils/empty-iterable.js');

	var _key_iterator = Symbol.iterator;

	class DeepIterable extends Root {

		constructor(base, deeper, shallower, preprocess) {
			super();
			this.base = base;
			this.deeper = _getfunc(deeper, DeepIterable.DEFAULT_DEEPER);
			this.shallower = _getfunc(shallower, DeepIterable.DEFAULT_SHALLOWER);
			this.preprocess = _getfunc(preprocess, DeepIterable.DEFAULT_PREPROCESS);
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

	DeepIterable.Circular = class extends Root {

		constructor(base, deeper, equal, circular) {
			super();
			this.base = base;
			this.deeper = _getfunc(deeper, DeepIterable.DEFAULT_DEEPER);
			this.equal = _getfunc(equal, Object.is);
			this.circular = _getfunc(circular, DeepIterable.Circular.DEFAULT_CIRCULAR_HANDLER);
		}

		[_key_iterator]() {

			var history = [];
			var base = this.base;
			var deeper = this.deeper;
			var equal = this.equal;
			var circular = this.circular;
			var duplicated = false;

			return new DeepIterable(
				base,
				(iterable, ...args) =>
					history.find(bind(equal, iterable)) ?
						deeper(iterable, ...args) : (duplicated = true, false),
				() =>
					history.pop(),
				(iterable) =>
					duplicated ?
						(duplicated = false, circular(iterable)) : iterable
			)[_key_iterator]();

		}

		static DEFAULT_CIRCULAR_HANDLER() {
			return EMPTY_ITERABLE;
		}

	};

	var _getval = (type, first, ...second) =>
		typeof first === type || !second.length ? first : _getval(type, ...second);

	var _getfunc = bind(_getval, 'function');

	// DeepIterable.Circular = class extends DeepIterable {

	// 	constructor(base, deeper, equal, circular) {

	// 		var history = [];

	// 		if (typeof circular !== 'function') {
	// 			circular = DeepIterable.Circular.DEFAULT_CIRCULAR_HANDLER;
	// 		}

	// 		super(base, deeper, () => history.pop(), (iterable) => history.some(bind(equal, iterable)) ? circular(iterable) : iterable);

	// 	}

	// 	static DEFAULT_CIRCULAR_HANDLER() {
	// 		return EMPTY_ITERABLE;
	// 	}

	// }

})(module);
