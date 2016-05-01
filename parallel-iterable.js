
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var createClass = require('./create-class.js');
	var Root = require('./root.js').class;
	var ParallelIterableSuper = require('./utils/appx-super-class.js')(build, iterate);

	var _key_iterator = Symbol.iterator;

	class ParallelIterable extends ParallelIterableSuper {

		static END_OF_FIRST([{done}]) {
			return done;
		}

		static END_OF_SOME(elements) {
			return elements.some(({done}) => done);
		}

		static END_OF_ALL(elements) {
			return elements.every(({done}) => done);
		}

		static FOR_COUNT(count) {
			return (elements) => !(count--);
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
			if (this.stop(elements, this)) {
				break;
			} else {
				yield elements.map(({value}) => value);
			}
		}
	}

})(module);
