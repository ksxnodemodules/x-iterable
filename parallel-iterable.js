
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var createClass = require('./create-class.js');
	var Root = require('./root.js').class;
	var ParallelIterableSuper = require('./utils/appx-super-class.js')(build, iterate);
	var mostMatrix = require('./utils/most-matrix');

	var _key_iterator = Symbol.iterator;

	class ParallelIterable extends ParallelIterableSuper {

		most(callback, init) {
			return mostMatrix(callback, this, init);
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

		static FOR_COUNT(count) {
			return (elements) => count--;
		}

		static createXIterableClass(stop, ...classes) {

			var parallelConstructor = require('./utils/parallel-constructor.js');

			return createClass(class extends ParallelIterable.createXIterableClass.Root {

				constructor(...args) {
					super();
					this.base = new ParallelIterable(stop, ...parallelConstructor(classes, args));
				}

				* [_key_iterator]() {
					yield * this.base;
				}

			});

		}

	}

	module.exports = ParallelIterable;

	ParallelIterable.createXIterableClass.Root = createClassFromSuper(Root);

	function build(self, stop, ...iterables) {
		self.stop = stop;
		self.iterables = iterables;
	}

	function * iterate() {
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

})(module);
