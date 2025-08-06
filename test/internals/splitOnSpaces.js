import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { splitOnSpaces as split } from '#internals/splitOnSpaces.js'

test('splitOnSpaces', () => {
  assert.deepEqual(split('select'), ['select'], 'single word')
  assert.deepEqual(split('select 1'), ['select', ' ', '1'], 'single space')
  assert.deepEqual(split('select  1'), ['select', '  ', '1'], 'multiple spaces')
  assert.deepEqual(split('select	1'), ['select', '\t', '1'], 'tab')
})
