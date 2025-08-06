import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { splitOnOperators } from '#internals/splitOnOperators.js'

test('splitOnOperators', () => {
  const split = splitOnOperators(['+', '>='])

  assert.deepEqual(split('select 1+2'), ['select 1', '+', '2'], 'simple operator')
  assert.deepEqual(split('select 1 >=4'), ['select 1 ', '>=', '4'], 'two chars operator')
})
