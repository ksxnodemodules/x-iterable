
((module) => {
	'use strict';

	var Root = require('../root.js').class;
	var _key_iterator = Symbol.iterator;

	module.exports = (object, type, iterable, ...rest) => {

		if (!rest.length) {
			return new LastItem(iterable, type);
		}

		object.first = iterable;
		object.second = new type(...rest);

		return object;

	};

	class LastItem extends Root {

		constructor(iterable, type) {
			super();
			this.iterable = iterable;
		}

		* [_key_iterator]() {
			for (let element of this.iterable) {
				yield [element];
			}
		}

	}

})(module);
