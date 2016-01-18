
((module) => {
	'use strict';

	var createClass = require('./create-class.js');
	var Root = require('./root.js').class;

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
			return SpreadIterable.deep(...args);
		}

		static deep(iterable, level) {
			return this.create(level ? this.deep(iterable, level - 1) : iterable);
		}

	}

	module.exports = createClass(SpreadIterable);

})(module);
