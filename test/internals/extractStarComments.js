import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { extractStarComments as extract } from '#internals/extractStarComments.js'

test('extractStarComments', () => {
  assert.deepEqual(extract('select'), ['select'], 'single word')
  assert.deepEqual(extract('/* /**/'), ['/* /**/'], 'comment with special chars')
  assert.deepEqual(extract('/* comment */ select 1'), ['/* comment */', ' select 1'], 'simple comment')
  assert.deepEqual(extract('/* comment */ select 1 /* from foo */'), ['/* comment */', ' select 1 ', '/* from foo */'], 'many comments')
  assert.deepEqual(extract(`
/* comment */
select 1 -- ok

/* from foo */
`), ['\n', '/* comment */', '\nselect 1 -- ok\n\n', '/* from foo */', '\n'],
  'comments on many rows')
})
