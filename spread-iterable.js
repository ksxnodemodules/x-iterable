
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
				.create(...args.map((iterable) => Export.create(iterable)));
		}

		static times(...args) {
			return Export.deep(...args);
		}

		static deep(iterable, level) {
			if (!isFinite(level) || level < 0) {
				throw new TypeError(`${level} is not a positive finite number`);
			}
			for (iterable = new createClass.Yield(iterable), level = parseInt(level); level; --level) {
				iterable = new Export(iterable);
			}
			return iterable;
		}

		static createXIterableClass(Iterable, ...Args) {
			var ParallelIterable = require('./parallel-iterable.js');
			return createClassFromSuper.handleArgs(
				Export,
				(...args) => [
					new Iterable(
						...new ParallelIterable(ParallelIterable.END_OF_FIRST, Args, args)
							.transform((element) => new element[0](...element[1]))
					)
				]
			);
		}

	}

	var Export = module.exports = createClass(SpreadIterable);

})(module);
