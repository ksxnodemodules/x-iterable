
((module) => {
	'use strict';

	var Root = require('./root.js').class;

	var _key_iterator = Symbol.iterator;

	class ProductIterable extends Root {

		constructor(hseq, vseq) {
			super();
			this.hseq = hseq;
			this.vseq = vseq;
		}

	}

})(module);
