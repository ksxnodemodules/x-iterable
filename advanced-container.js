
((module) => {
	'use strict';

	var createClassFromSuper = require('simple-class-utils').createClass.super;
	var createClass = require('./create-class.js');
	var Root = require('./root.js').class;
	var transformIterable = require('./utils/transform-iterable.js');

	var _key_iterator = Symbol.iterator;

	class AdvancedContainerTemplate {

		Set(Container, equal) {

			Container = createClass(Container);

			class AdvSet extends AdvancedContainerTemplate.Set.Root {

				constructor(...args) {
					super();
					this.container = new Container(...args);
				}

				[_key_iterator]() {
					return transformIterable(this.container, (element) => element.value);
				}

				findPositionOf(value) {
					return this.container.find((element) => equal(value, element.value, this));
				}

			}

			return createClass(AdvSet);

		}

		Map(Container, equal) {

		}

	}

	module.exports = new AdvancedContainerTemplate();

	var SupRoot = AdvancedContainerTemplate.Root = createClassFromSuper(Root);
	((proto) => {
		var SubRoot = proto.Root = createClassFromSuper(SupRoot);
		proto.Set.Root = createClassFromSuper(SubRoot);
		proto.Map.Root = createClassFromSuper(SubRoot);
	})(AdvancedContainerTemplate.prototype);

})(module);
