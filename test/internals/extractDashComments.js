import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { extractDashComments } from '#internals/extractDashComments.js'

test('extractDashComments', () => {
  for (const { input, output, description } of [
    {
      input: 'select 1 -- comment',
      output: ['select 1 ', '-- comment'],
      description: 'single line with inline comment'
    },
    {
      input: `
select 1 -- ok
from foo -- comment
`,
      output: ['\n', 'select 1 ', '-- ok', '\n', 'from foo ', '-- comment', '\n'],
      description: 'comments on many rows'
    },
  ]) {
    assert.deepEqual(extractDashComments(input), output, description)
  }
})
