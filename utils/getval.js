
((module) => {
	'use strict';

	var bind = require('simple-function-utils/bind').begin;

	var _getval = module.exports = (type, first, ...second) =>
		typeof first === type || !second.length ? first : _getval(type, ...second);

	['boolean', 'function', 'number', 'object', 'undefined', 'string', 'symbol']
		.forEach((name) => _getval[name] = bind(_getval, name));

})(module);
