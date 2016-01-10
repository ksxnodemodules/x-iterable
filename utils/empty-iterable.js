
((module) => {
	'use strict';

	var EmptyIterable = require('../create-class')
		.fromGenerator(() => EMPTY_GENERATOR);

	const RETURN_EMPTY_ITERATOR = () => EMPTY_ITERATOR;
	const EMPTY_GENERATOR = Object.freeze({
		next: RETURN_EMPTY_ITERATOR,
		return: RETURN_EMPTY_ITERATOR
	});
	const EMPTY_ITERATOR = Object.freeze({
		done: true
	});

	const out = new EmptyIterable();
	out.EmptyIterable = EmptyIterable;
	out.RETURN_EMPTY_ITERATOR = RETURN_EMPTY_ITERATOR;
	out.EMPTY_GENERATOR = EMPTY_GENERATOR;
	out.EMPTY_ITERATOR = EMPTY_ITERATOR;

	module.exports = Object.freeze(out);

})(module);
