import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { extractStarComments } from '#internals/extractStarComments.js'

test('extractStarComments', () => {
  for (const { input, output, description } of [
    {
      input: '/* /**/',
      output: ['/* /**/'],
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
    assert.deepEqual(extractStarComments(input), output, description)
  }
})
