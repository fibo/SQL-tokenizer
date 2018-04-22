const test = require('tape')

const split = require('../src/splitOnSpaces')

test('splitOnSpaces', (t) => {
  t.deepEqual(split('select'), ['select'], 'single word')
  t.deepEqual(split('select 1'), ['select', ' ', '1'], 'single space')

  t.end()
})
