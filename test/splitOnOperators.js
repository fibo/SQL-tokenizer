const test = require('tape')

const split = require('../src/splitOnOperators')(['+', '>='])

test('splitOnOperators', (t) => {
  t.deepEqual(split('select 1+2'), ['select 1', '+', '2'], 'simple operator')
  t.deepEqual(split('select 1 >=4'), ['select 1 ', '>=', '4'], 'two chars operator')

  t.end()
})
