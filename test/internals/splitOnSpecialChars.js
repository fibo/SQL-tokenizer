import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { sqlSpecialChars } from 'sql-tokenizer'
import { splitOnSpecialChars } from '#internals/splitOnSpecialChars.js'

test('splitOnSpecialChars', () => {
  const split = splitOnSpecialChars(sqlSpecialChars)

  for (const { input, output, description } of [
    {
      input: ';',
      output: [';'],
      description: 'single semicolon'
    },
    {
      input: '12, 2',
      output: ['12', ',', ' 2'],
      description: 'comma'
    },
    {
      input: '1;2',
      output: ['1', ';', '2'],
      description: 'semicolon'
    },
    {
      input: '1+2',
      output: ['1', '+', '2'],
      description: 'single operator'
    },
    {
      input: 'SELECT table.column FROM table WHERE table.column = 1',
      output: ['SELECT table', '.', 'column FROM table WHERE table', '.' , 'column ', '=', ' 1'],
      description: 'dot operator'
    },
    {
      input: '1 >=4',
      output: ['1 ', '>=', '4'],
      description: 'two chars operator'
    },
    {
      input: 'SELECT column FROM table1, table2 WHERE table1.column(+) = table2.column',
      output: ['SELECT column FROM table1', ',', ' table2 WHERE table1', '.', 'column', '(+)', ' ', '=', ' table2', '.', 'column'],
      description: 'Oracle join operator'
    }
  ]) {
    assert.deepEqual(split(input), output, description)
  }
})
