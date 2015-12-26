
module.exports = (iterable) =>
	iterable !== undefined && iterable !== null && typeof iterable[Symbol.iterator] === 'function';
