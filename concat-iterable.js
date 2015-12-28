
((module) => {
	'use strict';

	var recursiveConstructor = require('./utils/recursive-constructor.js');
	var manySameElements = require('./utils/many-same-elements.js');
	var ConcatIterableSuper = require('./utils/appx-super-class.js')(build, iterate);

	class ConcatIterable extends ConcatIterableSuper {

		static times(...args) {
			return ConcatIterable.multiply(...args);
		}

		static multiply(iterable, times) {
			var args = manySameElements(iterable, times);
			return args.length ? new ConcatIterable(...args) : [];
		}

	}

	module.exports = ConcatIterable;

	function build(self, ...args) {
		return recursiveConstructor(self, ConcatIterable, (value) => value, ...args);
	}

	function * iterate() {
		yield * this.first;
		yield * this.second;
	}

})(module);
