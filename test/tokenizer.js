import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { sqlTokenizer, sqlSpecialChars } from 'sql-tokenizer'

test('sql-tokenizer', () => {
  const tokenize = sqlTokenizer()

  for (const { input, output, description } of [
    {
      input: 'SELECT * FROM sales',
      output: ['SELECT', ' ', '*', ' ', 'FROM', ' ', 'sales'],
      description: 'select star'
    },
    {
      input: 'SELECT 1,2',
      output: ['SELECT', ' ', '1', ',', '2'],
      description: 'commas'
    },
    {
      input: 'select',
      output: ['select'],
    },
    {
      input: '-- select 1',
      output: ['-- select 1'],
      description: 'dash comment, whole line'
    },
    {
      input: 'select 1 -- this is a comment',
      output: ['select', ' ', '1', ' ', '-- this is a comment'],
      description: 'dash comment, partial line'
    },
    {
      input: 'select 1 /* this is a comment */',
      output: ['select', ' ', '1', ' ', '/* this is a comment */'],
      description: 'slash star comment, partial line'
    },
    {
      input: `select -- this is a comment
1 -- on multiple lines`,
      output: [ 'select', ' ', '-- this is a comment', '\n', '1', ' ', '-- on multiple lines' ],
      description: 'dash comment, partial line'
    },
    {
      input: `select
1`,
      output: ['select', '\n', '1'],
      description: 'newline'
    },
    {
      input: '  select   1',
      output: ['  ', 'select', '   ', '1'],
      description: 'spaces'
    },
    {
      input: "  select  'x'   as  y",
      output: ['  ', 'select', '  ', "'x'", '   ', 'as', '  ', 'y'],
      description: 'many space chars'
    },
    {
      input: "select 'hello world'",
      output: ['select', ' ', "'hello world'"],
      description: 'single quotes'
    },
    {
      input: `select 'O''Reilly' as "book shelf"`,
      output: ['select', ' ', "'O''Reilly'", ' ', 'as', ' ', '"book shelf"'],
      description: 'mixed quotes'
    },
    {
      input: 'SELECT `t.column` FROM `table` AS t',
      output: ['SELECT', ' ', '`t.column`', ' ', 'FROM', ' ', '`table`', ' ', 'AS', ' ', 't'],
      description: 'backticks'
    },
    {
      input: 'SELECT `SELECT` FROM `FROM` WHERE `WHERE` = 42',
      output: ['SELECT', ' ', '`SELECT`', ' ', 'FROM', ' ', '`FROM`', ' ', 'WHERE', ' ', '`WHERE`', ' ', '=', ' ', '42'],
      description: 'LOL'
    },
    {
      input: `
SELECT COUNT(*) AS num
FROM (
	SELECT *
	FROM mytable
	WHERE yyyymmdd=20170101
		AND country IN ('IT','US')
)
`,
      output: [
        '\n',
        'SELECT', ' ', 'COUNT', '(', '*', ')', ' ', 'AS', ' ', 'num', '\n',
        'FROM', ' ', '(', '\n',
        '\t', 'SELECT', ' ', '*', '\n',
        '\t', 'FROM', ' ', 'mytable', '\n',
        '\t', 'WHERE', ' ', 'yyyymmdd', '=', '20170101', '\n',
        '\t\t', 'AND', ' ', 'country', ' ', 'IN', ' ', '(', "'IT'", ',', "'US'", ')', '\n',
        ')', '\n'
      ],
      description: 'indentation is preserved'
    },
    {
      input: `SELECT column_list
FROM table1, table2
WHERE table1.column = table2.column(+);
`,
      output: [
        'SELECT', ' ', 'column_list', '\n',
        'FROM', ' ', 'table1', ',', ' ', 'table2', '\n',
        'WHERE', ' ', 'table1', '.', 'column', ' ', '=', ' ', 'table2', '.', 'column', '(+)', ';', '\n'
      ],
      description: 'Oracle Left Outer Join',
    },
    {
      input: `SELECT column_list
FROM table1, table2
WHERE table1.column(+) = table2.column;`,
      output: [
        'SELECT', ' ', 'column_list', '\n',
        'FROM', ' ', 'table1', ',', ' ', 'table2', '\n',
        'WHERE', ' ', 'table1', '.', 'column', '(+)', ' ', '=', ' ', 'table2', '.', 'column', ';'
      ],
      description: 'Oracle Right Outer Join',
    },
  ]) {
    assert.deepEqual(tokenize(input), output, description)
  }
})

test('Custom special chars', () => {
  const mySpecialChars = ['->', '->>']
  const tokenize = sqlTokenizer(sqlSpecialChars.concat(mySpecialChars))

  for (const { input, output, description } of [
    {
      input: 'SELECT * FROM sales WHERE data->"$.name" = "John"',
      output: ['SELECT', ' ', '*', ' ', 'FROM', ' ', 'sales', ' ', 'WHERE', ' ', 'data', '->', '"$.name"', ' ', '=', ' ', '"John"'],
      description: 'custom operator ->'
    },
    {
      input: 'SELECT * FROM sales WHERE data->>"$.name" = "John"',
      output: ['SELECT', ' ', '*', ' ', 'FROM', ' ', 'sales', ' ', 'WHERE', ' ', 'data', '->>', '"$.name"', ' ', '=', ' ', '"John"'],
      description: 'custom operator ->>'
    },
  ]) {
    assert.deepEqual(tokenize(input), output, description)
  }
})
