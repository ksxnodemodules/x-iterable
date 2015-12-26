
function main() {
	'use strict';

	var DeepIterable = require('x-iterable/deep-iterable.js');

	var base = [0, 1, [2, 3, 4, [5, 6, 7], 8], 9, 10, [11, 12, [13, 14], [[15], 16, [17]]], "text", ["foo", ["bar"]]];

	return {
		'Class': DeepIterable,
		'test': test,
		'base': base,
		'example': test(base)
	};

	function test(base) {
		var object = new DeepIterable(base);
		var set = new Set(object);
		var array = Array.from(object);
		return {
			object: object,
			set: set,
			array: array
		};
	}

}

module.exports = main();
