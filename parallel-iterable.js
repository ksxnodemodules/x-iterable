
((module) => {
	'use strict';

	var createClass = require('./create-class.js');
	var Root = require('./root.js').class;

	var _key_iterator = Symbol.iterator;

	class ParallelIterable extends Root {

		constructor(iterable, ...rest) {

			super();

			if (!rest.length) {
				return {
					* [_key_iterator]() {
						for (let element of iterable) {
							yield [element];
						}
					}
				};
			}

			this.first = iterable;
			this.second = new ParallelIterable(...rest);

		}

	}

	module.exports = ParallelIterable;

})(module);
