
((module) => {
	'use strict';

	var _key_iterator = Symbol.iterator;

	module.exports = (object, type, last, iterable, ...rest) => {

		if (!rest.length) {
			return new LastItem(iterable, last);
		}

		object.first = iterable;
		object.second = new type(...rest);

		return object;

	};

	function LastItem(iterable, make) {
		this[_key_iterator] = function * () {
			for (let element of iterable) {
				yield make(element);
			}
		};
	}

})(module);
