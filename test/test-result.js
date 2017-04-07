
((module) => {
  'use strict'

  class TestResult {
    constructor (testclass, testargs) {
      this.class = testclass
      this.args = testargs
    }

    * [Symbol.iterator] () {
      yield * this.object
    }

    get object () {
      const Test = this.class
      return new Test(...this.args)
    }

    get array () {
      return Array.from(this)
    }

    get set () {
      return new Set(this)
    }

    get commaSeparated () {
      return this.array.join(', ')
    }
  }

  module.exports = require('x-iterable').createClass(TestResult)
})(module)
