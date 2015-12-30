
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

				entries() {
					return transformIterable(this, (element) => new Entry(element, element));
				}

				findPositionOf(value) {
					return this.container.find((element) => equal(value, element.value, this));
				}

				has(value) {
					return Boolean(this.container.findPositionOf(value));
				}

				add(value) {
					this.has(value) && this.container.add(new AdvSet.Element(value));
					return this;
				}

				clear() {
					this.container.clear();
					return this;
				}

				get size() {
					return this.container.size;
				}

			}

			AdvSet.Element = createClassFromSuper(AdvSet.Element);

			return createClass(AdvSet);

		}

		Map(Container, equal) {

		}

	}

	module.exports = new AdvancedContainerTemplate();

	var SupRoot = AdvancedContainerTemplate.Root = createClassFromSuper(Root);
	var SupElement = AdvancedContainerTemplate.Element = createClassFromSuper(Root);
	((proto) => {

		var SubRoot = proto.Root = class extends SupRoot {

			keys() {
				return transformIterable(this.entries(), (entry) => entry.key);
			}

			values() {
				return transformIterable(this.entries(), (entry) => entry.value);
			}
			
		};

		proto.Set.Root = createClassFromSuper(SubRoot);

		proto.Map.Root = createClassFromSuper(SubRoot);

		var SubElement = proto.Element = createClassFromSuper(SupElement);

		proto.Set.Element = class extends SubElement {
			constructor(value) {
				super();
				this.value = value;
			}
		};

		proto.Map.Element = class extends SubElement {
			constructor(key, value) {
				super();
				this.key = key;
				this.value = value;
			}
		};

	})(AdvancedContainerTemplate.prototype);

	class Entry extends Array {

		get key() {
			return this[0];
		}

		get value() {
			return this[1];
		}

	}

	AdvancedContainerTemplate.Entry = Entry;

})(module);
