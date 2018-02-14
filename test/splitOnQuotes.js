const test = require('tape')

const split = require('../src/splitOnQuotes')

test('splitOnQuotes', (t) => {
  t.deepEqual(split('select'), ['select'], 'single word')
  t.deepEqual(split("select 'hello world' from mytable"), ['select ', "'hello world'", ' from mytable'], 'single quotes')
  t.deepEqual(split("select 'O''Reilly' from mytable"), ['select ', "'O''Reilly'", ' from mytable'], 'escape quotes')
  t.deepEqual(split("select 'hello world'"), ['select ', "'hello world'"], 'single quotes, last char is a quote')

  t.end()
})
