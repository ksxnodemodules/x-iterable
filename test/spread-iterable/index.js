
function main () {
  'use strict'

  var SpreadIterable = require('x-iterable/spread-iterable.js')
  var TestResult = require('../test-result.js')

  var base = ['abc', 'def', 'ghi']

  return {
    'base': base,
    'example': new TestResult(SpreadIterable, [base])
  }
}

module.exports = main()
