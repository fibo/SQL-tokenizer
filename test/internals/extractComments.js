import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { extractComments as extract } from '#internals/extractComments.js'

test('extractComments', () => {
  assert.deepEqual(extract('select'), ['select'], 'single word')
  assert.deepEqual(extract(`
select 1 -- ok
/* comment */
from foo -- comment
`), ['\n', 'select 1 ', '-- ok', '\n', '/* comment */', '\n', 'from foo ', '-- comment', '\n'],
  'comments on many rows')
})
