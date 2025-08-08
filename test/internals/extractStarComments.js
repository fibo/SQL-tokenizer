import { strict as assert } from 'node:assert'
import { DatabaseSync } from 'node:sqlite'
import { test } from 'node:test'

import { extractStarComments } from '#internals/extractStarComments.js'

test('extractStarComments', () => {
  const database = new DatabaseSync(':memory:')

  for (const statement of [
    'CREATE TABLE foo (bar TEXT)',
  ]) {
    database.exec(statement)
  }

  for (const { input, output, description } of [
    {
      input: 'SELECT /* /**/ 1',
      output: ['SELECT ', '/* /**/', ' 1'],
      description: 'comment with special chars'
    },
    {
      input: '/* comment */ select 1',
      output: ['/* comment */', ' select 1'],
      description: 'single line with inline comment'
    },
    {
      input: '/* comment */ select 1 /* from foo */',
      output: ['/* comment */', ' select 1 ', '/* from foo */'],
      description: 'many comments'
    },
    {
      input: `
/* comment */
select 1 -- ok

/* from foo */
`,
      output: ['\n', '/* comment */', '\nselect 1 -- ok\n\n', '/* from foo */', '\n'],
      description: 'comments on many rows'
    },
  ]) {
    database.prepare(input)
    assert.deepEqual(extractStarComments(input), output, description)
  }
})
