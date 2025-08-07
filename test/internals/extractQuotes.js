import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { extractQuotes } from '#internals/extractQuotes.js'

test('extractQuotes', () => {
  for (const { input, output, description } of [
    {
      input: 'select 1 as "my num"',
      output: ['select 1 as ', '"my num"'],
      description: 'double quotes',
    },
    {
      input: "'alias'",
      output: ["'alias'"],
      description: 'single quoted word',
    },
    {
      input: "select 'hello world' from mytable",
      output: ['select ', "'hello world'", ' from mytable'],
      description: 'single quotes',
    },
    {
      input: "select 'O''Reilly' from mytable",
      output: ['select ', "'O''Reilly'", ' from mytable'],
      description: 'escape quotes',
    },
    {
      input: "select 'hello world'",
      output: ['select ', "'hello world'"],
      description: 'single quotes, last char is a quote',
    },
    {
      input: 'SELECT `column` FROM `table`',
      output: ['SELECT ', '`column`', ' FROM ', '`table`'],
      description: 'backticks',
    },
  ]) {
    assert.deepEqual(extractQuotes(input), output, description)
  }
})
