import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { extractDashComments as extract } from '#internals/extractDashComments.js'

test('extractDashComments', () => {
  assert.deepEqual(extract('select'), ['select'], 'single word')
  assert.deepEqual(extract(`
select 1 -- ok
from foo -- comment
`), ['\n', 'select 1 ', '-- ok', '\n', 'from foo ', '-- comment', '\n'],
  'comments on many rows')
})
