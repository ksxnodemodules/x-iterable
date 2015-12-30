
((module) => {
	'use strict';

	var _key_iterator = Symbol.iterator;

	return function * (iterable, transform) {

		var iterate = iterable[_key_iterator];
		var iterator = typeof iterate === 'function' ? iterate.call(iterable) : iterable;

		for ( ; ; ) {
			let stage = iterator.next();
			if (stage.done) {
				break;
			} else {
				yield transform(stage.value);
			}
		}

	};

})(module);
