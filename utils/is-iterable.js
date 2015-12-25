
module.exports = (iterable) =>
	typeof iterable[Symbol.iterator] === 'function';
