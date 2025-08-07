import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { splitOnSpaces } from '#internals/splitOnSpaces.js'

test('splitOnSpaces', () => {
  for (const { input, output, description } of [
    {
      input: 'select 1',
      output: ['select', ' ', '1'],
      description: 'single space'
    },
    {
      input: 'select   1',
      output: ['select', '   ', '1'],
      description: 'multiple spaces'
    },
    {
      input: 'select	1',
      output: ['select', '\t', '1'],
      description: 'tab'
    },
    {
      input: 'select 1 from foo',
      output: ['select', ' ', '1', ' ', 'from', ' ', 'foo'],
      description: 'single line with spaces'
    },
    {
      input: 'select 1 from foo where bar = 2',
      output: ['select', ' ', '1', ' ', 'from', ' ', 'foo', ' ', 'where', ' ', 'bar', ' ', '=', ' ', '2'],
      description: 'multiple spaces and operators'
    },
  ]) {
    assert.deepEqual(splitOnSpaces(input), output, description)
  }
})
