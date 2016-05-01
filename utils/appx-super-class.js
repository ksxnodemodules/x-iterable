
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var createClass = require('../create-class.js');
	var Root = require('../root.js').class;

	var _key_iterator = Symbol.iterator;

	module.exports = (build, iterate) => {

		var Base = createClass.fromGenerator(iterate);

		class AppxSuper extends Base {

			constructor(...args) {
				super();
				return build(this, ...args);
			}

			static createXIterableClass(...classes) {

				var parallelConstructor = require('./parallel-constructor.js');

				return createClass(class extends AppxSuper.createXIterableClass.Root {

					constructor(...args) {
						super();
						this.base = new AppxSuper(...parallelConstructor(classes, args));
					}

					* [_key_iterator]() {
						yield * this.base;
					}

				});
			}

		}

		AppxSuper.createXIterableClass.Root = createClassFromSuper(Root);

		return createClass(AppxSuper);

	};

})(module);
