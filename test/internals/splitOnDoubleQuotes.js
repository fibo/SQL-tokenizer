import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { splitOnDoubleQuotes as split } from '#internals/splitOnDoubleQuotes.js'

test('splitOnDoubleQuotes', () => {
  assert.deepEqual(split('select'), ['select'], 'single word')
  assert.deepEqual(split('select 1 as "my num"'), ['select 1 as ', '"my num"'], 'double quotes')
})
