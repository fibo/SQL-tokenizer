import { strict as assert } from 'node:assert'
import { DatabaseSync } from 'node:sqlite'
import { test } from 'node:test'

import { sqlSpecialChars } from 'sql-tokenizer'
import { splitOnSpecialChars } from '#internals/splitOnSpecialChars.js'

test('splitOnSpecialChars', () => {
  const database = new DatabaseSync(':memory:')

  for (const statement of [
    'CREATE TABLE table1 (column1 INTEGER)',
  ]) {
    database.exec(statement)
  }

  const split = splitOnSpecialChars(sqlSpecialChars)

  for (const { input, output, description, notSqlite } of [
    {
      input: ';',
      output: [';'],
      description: 'single semicolon'
    },
    {
      input: 'select 12, 2',
      output: ['select 12', ',', ' 2'],
      description: 'comma'
    },
    {
      input: 'select 1; select 2',
      output: ['select 1', ';', ' select 2'],
      description: 'semicolon'
    },
    {
      input: 'select 1+2',
      output: ['select 1', '+', '2'],
      description: 'single operator'
    },
    {
      input: 'SELECT table1.column1 FROM table1 WHERE table1.column1 = 1',
      output: ['SELECT table1', '.', 'column1 FROM table1 WHERE table1', '.' , 'column1 ', '=', ' 1'],
      description: 'dot operator'
    },
    {
      input: 'select 1 >=4',
      output: ['select 1 ', '>=', '4'],
      description: 'two chars operator'
    },
    {
      input: 'SELECT column1 FROM table1, table2 WHERE table1.column1(+) = table2.column1',
      output: ['SELECT column1 FROM table1', ',', ' table2 WHERE table1', '.', 'column1', '(+)', ' ', '=', ' table2', '.', 'column1'],
      description: 'Oracle join operator',
      notSqlite: true
    }
  ]) {
    if (!notSqlite) {
      database.prepare(input)
    }
    assert.deepEqual(split(input), output, description)
  }
})
