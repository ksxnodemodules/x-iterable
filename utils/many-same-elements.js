
((module) => {
	'use strict';

	module.exports = (value, times) => {
		times = parseInt(times);
		if (times < 0 || isNaN(times)) {
			throw new RangeError(`Parameter 'times' is invalid`);
		}
		if (!times) {
			return [];
		}
		var result = [];
		for ( ; times; --times) {
			result.push(value);
		}
		return result;
	}

})(module);
