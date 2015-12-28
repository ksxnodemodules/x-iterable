
((module) => {
	'use strict';

	var recursiveConstructor = require('./utils/recursive-constructor.js');
	var ConcatIterable = require('./utils/appx-super-class.js')(build, iterate);

	module.exports = ConcatIterable;

	function build(self, ...args) {
		return recursiveConstructor(self, ConcatIterable, ...args);
	}

	function * iterate() {
		yield * this.first;
		yield * this.second;
	}

})(module);
