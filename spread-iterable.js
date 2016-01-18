
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var createClass = require('./create-class.js');
	var Root = createClassFromSuper(require('./root.js').class);

	var _key_iterator = Symbol.iterator;

	class SpreadIterable extends Root {

		constructor(iterable) {
			super();
			this.iterable = iterable;
		}

		* [_key_iterator]() {
			for (let element of this.iterable) {
				yield * element;
			}
		}

		static many(...args) {
			return require('./concat-iterable.js')
				.create(...args.map((iterable) => this.create(iterable)));
		}

		static times(...args) {
			return this.deep(...args);
		}

		static deep(iterable, level) {
			if (!isFinite(level) || level < 0) {
				throw new TypeError(`${level} is not a positive finite number`);
			}
			for (iterable = new createClass.Yield(iterable), level = parseInt(level); level; --level) {
				iterable = new this(iterable);
			}
			return iterable;
		}

	}

	module.exports = createClass(SpreadIterable);

})(module);
