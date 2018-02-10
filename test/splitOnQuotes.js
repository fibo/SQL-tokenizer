const test = require('tape')

const split = require('../src/splitOnQuotes')

test('splitOnQuotes', (t) => {
  t.deepEqual(split('select'), ['select'], 'single word')
  t.deepEqual(split("select 'hello world'"), ['select ', "'hello world'"], 'single quotes')
  // TODO t.deepEqual(split("select 'O ''Reilly'"), ['select ', "'O''Reilly'"], 'escape quotes')

  t.end()
})
