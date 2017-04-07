
function main () {
  'use strict'

  var DeepIterable = require('x-iterable/deep-iterable')
  var Class = DeepIterable.Circular
  var TestResult = require('../test-result')

  var array = [0, 1, 2, 3, 'abc', ['abcdef'], [[0, 1, 2]]]
  array.push(array, [[array], array])
  var left = [Symbol('left')]
  var right = [Symbol('right')]
  array = [array, [array], left, right]
  left.push(right)
  right.push(left)

  var args = [array]

  return {
    'example': new TestResult(Class, args)
  }
}

module.exports = main()
