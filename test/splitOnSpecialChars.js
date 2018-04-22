const test = require('tape')

const split = require('../src/splitOnSpecialChars')

test('splitOnSpecialChars', (t) => {
  t.deepEqual(split(','), [','], 'single comma')
  t.deepEqual(split(';'), [';'], 'single semicolon')
  t.deepEqual(split('12, 2'), ['12', ',', ' 2'], 'comma')
  t.deepEqual(split('1;2'), ['1', ';', '2'], 'semicolon')

  t.end()
})
