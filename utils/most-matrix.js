
((module) => {
	'use strict';

	module.exports = (callback, matrix, init) => {
		for (let subset of matrix) {
			for (let element of subset) {
				if (callback(element, init)) {
					init = element;
				}
			}
		}
		return init;
	};

})(module);
