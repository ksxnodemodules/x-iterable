
function main () {
  'use strict'

  return {
    'x-iterable': require('./x-iterable'),
    'concat-iterable': require('./concat-iterable'),
    'deep-iterable': require('./deep-iterable'),
    'parallel-iterable': require('./parallel-iterable'),
    'product-iterable': require('./product-iterable'),
    'spread-iterable': require('./spread-iterable'),
    'main-module': require('..')
  }
}

module.exports = main()
