
((module) => {
	'use strict';

	var createClass = require('./create-class.js');
	var Root = require('./root.js').class;
	var recursiveConstructor = require('./utils/recursive-constructor.js');

	var _key_iterator = Symbol.iterator;

	class ParallelIterable extends Root {

		constructor(stop, ...iterables) {
			if (typeof stop !== 'function') {
				throw new TypeError(`Parameter 'stop' must be a function`);
			}
			super();
			this.stop = stop;
			this.iterables = iterables;
		}

		* [_key_iterator]() {
			var iterators = this.iterables.map((iterable) => iterable[_key_iterator]());
			for ( ; ; ) {
				var elements = iterators.map((iterator) => iterator.next());
				if (this.stop(elements)) {
					break;
				} else {
					yield elements.map((element) => element.value);
				}
			}
		}

		static END_OF_FIRST(elements) {
			return elements[0].done;
		}

		static END_OF_SOME(elements) {
			return elements.some((element) => element.done);
		}

		static END_OF_ALL(elements) {
			return elements.every((element) => element.done);
		}

	}

	module.exports = ParallelIterable;

})(module);
