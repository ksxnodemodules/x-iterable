
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var bind = require('simple-function-utils/bind').begin;
	var Root = require('./root.js').class;

	var _key_iterator = Symbol.iterator;

	module.exports = createClass;

	function createClass(Super = createClass.default, ...args) {

		class XIterable extends Super {

			* transformGenerator(callback) {
				for (let element of this) {
					yield callback(element, this);
				}
			}

			transformOnce(callback) {
				return new createClass.Yield(this.transformGenerator(callback));
			}

			transform(callback) {
				return new createClass.AssignIterator(() => this.transformGenerator(callback));
			}

			* filterGenerator(callback) {
				for (let element of this) {
					if (callback(element, this)) {
						yield element;
					}
				}
			}

			filterOnceIterable(callback) {
				return new createClass.Yield(this.filterGenerator(callback));
			}

			filterIterable(callback) {
				return new createClass.AssignIterator(() => this.filterGenerator(callback));
			}

			runthrough() {
				for (let gen = this[_key_iterator](); !gen.next().done; );
			}

			forEach(callback) {
				for (let element of this) {
					callback(element, this);
				}
			}

			map(callback) {
				return this.Array.from(this.transformOnce(callback));
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
				return this.Array.from(this.filterIterable(callback));
			}

			reduce(callback, init) {
				this.forEach((element) => {init = callback(init, element, this)});
				return init;
			}

			spread(callback) {
				if (typeof callback !== 'function') {
					callback = this.spread.DEFAULT_CALLBACK;
				}
				var Result = this.Array;
				return this.reduce((prev, now) => new Result(...prev, ...callback(now, this)), new Result());
			}

			get sumAsNum() {
				return this.reduce((prev, now) => prev + Number(now), 0);
			}

			get productAsNum() {
				return this.reduce((prev, now) => prev * Number(now), 1);
			}

			get sumAsStr() {
				return this.reduce((prev, now) => prev + String(now), '');
			}

			get sumAsReservedStr() {
				return this.reduce((prev, now) => String(now) + prev, '');
			}

			most(callback, init) {
				for (let element of this) {
					if (callback(element, init, this)) {
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

			toArray() {
				return this.Array.from(this);
			}

			find(callback) {
				for (let element of this) {
					if (callback(element, this)) {
						return element;
					}
				}
			}

			search(callback) {
				for (let element of this) {
					if (callback(element, this)) {
						return new this.search.Result(element, this);
					}
				}
			}

		}

		((proto) => {

			proto.Array = Array;

			proto.search.Result = class extends Root {
				constructor(value, object) {
					super();
					this.value = value;
					this.object = object;
				}
			};

			proto.spread.ITERABLES = (element, self) => new self.Array(...element);
			proto.spread.DEFAULT_CALLBACK = proto.spread.ITERABLES;

			if (proto.has === undefined) {
				Object.assign(proto, {
					has(element, equal = this.equal.DEFAULT_EQUAL) {
						return this.some(bind(equal, element));
					}
				});
				proto.has.DEFAULT_EQUAL = Object.is;
			}

			var superproto = Object.getPrototypeOf(proto);

			makeMethodExists('join', function (...args) {
				return this.toArray().join(...args);
			});

			function makeMethodExists(fname, func) {
				if (typeof superproto[fname] !== 'function') {
					proto[fname] = func;
				}
			}

		})(XIterable.prototype);

		return createClassFromSuper(XIterable, ...args);

	}

	createClass.default = Root.IterableBased;

	createClass.fromGenerator = (gen, ...args) =>
		createClass(class extends createClass.fromGenerator.Root {
			constructor(...args) {
				super();
				this[_key_iterator] = (...rest) => gen.call(this, ...args, ...rest);
			}
		}, ...args);


	createClass.fromGenerator.Root = createClassFromSuper(Root);

	createClass.Yield = createClass.fromGenerator(function * (base) {
		yield * base;
	});

	createClass.AssignIterator = createClass(class extends Root {
		constructor(iterate) {
			super();
			this[_key_iterator] = iterate;
		}
	});

})(module);
