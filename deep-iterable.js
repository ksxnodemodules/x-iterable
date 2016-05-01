
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super.handleArgs;
	var bind = require('simple-function-utils/bind').begin;
	var boolean = require('simple-function-utils/boolean');
	var createClass = require('./create-class.js');
	var isIterable = require('./utils/is-iterable.js');
	var Root = require('./root.js').class;

	const EMPTY_ITERABLE = require('./utils/empty-iterable.js');

	var _key_iterator = Symbol.iterator;

	class PureDeepIterable extends createClass(Root) {

		constructor(base, deeper, shallower, preprocess) {
			super();
			this.base = base;
			this.deeper = deeper;
			this.shallower = shallower;
			this.preprocess = preprocess;
		}

		* [_key_iterator]() {
			var deeper = this.deeper;
			var shallower = this.shallower;
			var preprocess = this.preprocess;
			var iterable = preprocess(this.base, this);
			if (deeper(iterable, this)) {
				for (let element of iterable) {
					yield * new PureDeepIterable(element, deeper, shallower, preprocess);
				}
				shallower(iterable, this);
			} else {
				yield iterable;
			}
		}

	}

	class DeepIterable extends PureDeepIterable {

		constructor(
			base,
			deeper = DeepIterable.DEFAULT_DEEPER,
			shallower = DeepIterable.DEFAULT_SHALLOWER,
			preprocess = DeepIterable.DEFAULT_PREPROCESS
		) {
			super(base, boolean.and(isIterable, deeper), shallower, preprocess);
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

	module.exports = class extends DeepIterable {};

	DeepIterable.PureDeepIterable = DeepIterable.Pure = DeepIterable.Super = PureDeepIterable;

	DeepIterable.DEFAULT_DEEPER = DeepIterable.OBJECT_DEEPER;
	DeepIterable.DEFAULT_SHALLOWER = () => {};
	DeepIterable.DEFAULT_PREPROCESS = (x) => x;

	DeepIterable.Circular = createClass(class extends Root {

		constructor(base, deeper = DeepIterable.DEFAULT_DEEPER, equal = Object.is, circular = DeepIterable.DEFAULT_CIRCULAR_HANDLER) {
			super();
			Object.assign(this, {base, deeper, equal, circular});
		}

		[_key_iterator]() {

			var history = [];
			var {base, deeper, equal, circular} = this;

			return new DeepIterable(
				base,
				(iterable, ...args) =>
					deeper(iterable, ...args) && history.push(iterable),
				() =>
					history.pop(),
				(iterable, ...args) =>
					history.some(bind(equal, iterable)) ?
						circular(iterable, ...args) || EMPTY_ITERABLE : iterable
			)[_key_iterator]();

		}

		static DEFAULT_CIRCULAR_HANDLER() {}

	});

})(module);
