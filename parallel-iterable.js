
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var createClass = require('./create-class.js');
	var Root = require('./root.js').class;

	var _key_iterator = Symbol.iterator;

	class ParallelIterable extends Root {

		constructor(stop, ...iterables) {
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

		static createXIterableClass(stop, ...classes) {
			return createClass(class extends ParallelIterable.createXIterableClass.Root {

				constructor(...args) {
					super();
					this.stop = stop;
					this.iterables = parallelConstructor(classes, args);
				}

				* [_key_iterator]() {
					yield * new ParallelIterable(this.stop, ...this.iterables);
				}

			});
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

	module.exports = createClass(ParallelIterable);

	ParallelIterable.createXIterableClass.Root = createClassFromSuper(Root);

	var parallelConstructor = require('./utils/parallel-constructor.js');

})(module);
