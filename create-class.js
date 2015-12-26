
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;

	var Root = require('./root.js').class;

	var _key_iterator = Symbol.iterator;

	module.exports = createClass;

	function createClass(Super, ...args) {

		class XIterable extends (typeof Super === 'function' ? Super : createClass.default) {

			constructor(...args) {
				super(...args);
			}

			forEach(callback) {
				for (let element of this) {
					callback(element, this);
				}
			}

			map(callback) {
				var result = new this.Array();
				this.forEach((element) => result.push(callback(element, this)));
				return result;
			}

			some(callback) {
				for (let element of this) {
					if (callback(element, this)) {
						return true;
					}
				}
				return false;
			}

			every(callback) {
				return !this.every((element) => !callback(element, this));
			}

			filter(callback) {
				var result = new this.Array();
				this.forEach((element) => callback(element, this) && result.push(element));
				return result;
			}

			most(callback, init) {
				for (let element of this) {
					if (callback(element, init)) {
						init = element;
					}
				}
				return init;
			}

			get min() {
				return this.most((challenger, champion) => challenger < champion, +Infinity);
			}

			get max() {
				return this.most((challenger, champion) => challenger > champion, -Infinity);
			}

		}

		((proto) => {
			proto.Array = Array;
		})(XIterable.prototype);

		return createClassFromSuper(XIterable, ...args);

	}

	createClass.default = Root.IterableBased;

	createClass.fromGenerator = (gen, ...args) => {

		var _key_args = Symbol('args');

		return createClass(class extends createClass.fromGenerator.Base {

			constructor(...args) {
				super();
				this[_key_args] = args;
			}

			* [_key_iterator]() {
				yield * gen.call(this, ...this[_key_args]);
			}

		}, ...args);

	}

	createClass.fromGenerator.Base = createClassFromSuper(Root, {setproto: true});

})(module);
