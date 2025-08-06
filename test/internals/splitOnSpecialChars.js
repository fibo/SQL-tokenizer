import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { splitOnSpecialChars as split } from '#internals/splitOnSpecialChars.js'

test('splitOnSpecialChars', () => {
  assert.deepEqual(split(','), [','], 'single comma')
  assert.deepEqual(split(';'), [';'], 'single semicolon')
  assert.deepEqual(split('12, 2'), ['12', ',', ' 2'], 'comma')
  assert.deepEqual(split('1;2'), ['1', ';', '2'], 'semicolon')
})
