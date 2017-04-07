
function main () {
  'use strict'

  var ConcatIterable = require('x-iterable/concat-iterable.js')
  var TestResult = require('../test-result.js')

  var args = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    'abcdefghijklmnopqrstuvwxyz'
  ]

  return {
    'test-args': args,
    'example': new TestResult(ConcatIterable, args)
  }
}

module.exports = main()
