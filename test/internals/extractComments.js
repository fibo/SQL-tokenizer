import { strict as assert } from 'node:assert'
import { DatabaseSync } from 'node:sqlite'
import { test } from 'node:test'

import { extractComments } from '#internals/extractComments.js'

test('extractComments', () => {
  const database = new DatabaseSync(':memory:')

  for (const statement of [
    'CREATE TABLE foo (bar TEXT)',
  ]) {
    database.exec(statement)
  }

  for (const { input, output, description } of [
    {
      input: 'select 1',
      output: ['select 1'],
      description: 'single line without comments'
    },
    {
      input: 'select 1 -- comment',
      output: ['select 1 ', '-- comment'],
      description: 'single line with inline comment'
    },
    {
      input: `
select 1 -- ok
/* comment */
from foo -- comment
`,
      output: ['\n', 'select 1 ', '-- ok', '\n', '/* comment */', '\n', 'from foo ', '-- comment', '\n'],
      description: 'comments on many rows'
    },
  ]) {
    database.prepare(input)
    assert.deepEqual(extractComments(input), output, description)
  }
})
