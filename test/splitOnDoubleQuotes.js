const test = require('tape')

const split = require('../src/splitOnDoubleQuotes')

test('splitOnDoubleQuotes', (t) => {
  t.deepEqual(split('select'), ['select'], 'single word')
  t.deepEqual(split('select 1 as "my num"'), ['select 1 as ', '"my num"'], 'double quotes')

  t.end()
})
