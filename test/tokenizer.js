import { strict as assert } from 'node:assert'
import { DatabaseSync } from 'node:sqlite'
import { test } from 'node:test'

import { sqlTokenizer, sqlSpecialChars } from 'sql-tokenizer'

test('sql-tokenizer', () => {
  const tokenize = sqlTokenizer()

  const database = new DatabaseSync(':memory:')

  for (const statement of [
    'CREATE TABLE sales (foo TEXT)',
    'CREATE TABLE foo (bar TEXT)',
    'CREATE TABLE `table` (`column` TEXT)',
    'CREATE TABLE `FROM` (`SELECT` TEXT, `WHERE` INTEGER)',
    'CREATE TABLE mytable (yyyymmdd INTEGER, country TEXT)',
  ]) {
    database.exec(statement)
  }

  for (const { input, output, description, notSqlite } of [
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
      input: `SELECT 'SELECT ''Hello'''`,
      output: ["SELECT", " ", "'SELECT ''Hello'''"],
      description: 'triple quotes'
    },
    {
      input: "INSERT INTO foo (bar) VALUES ('SELECT `funkyColumnName` FROM quux WHERE thing = ''blabla'' AND answer=42')",
      output: ['INSERT', ' ', 'INTO', ' ', 'foo', ' ', '(', 'bar', ')', ' ', 'VALUES', ' ', '(', "'SELECT `funkyColumnName` FROM quux WHERE thing = ''blabla'' AND answer=42'", ')'],
      description: 'funky quotes'
    },
    {
      input: 'SELECT t.`column` FROM `table` AS t',
      output: ['SELECT', ' ', 't', '.', '`column`', ' ', 'FROM', ' ', '`table`', ' ', 'AS', ' ', 't'],
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
      notSqlite: true,
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
      notSqlite: true,
    },
    {
      input: 'SELECT*FROM`table`',
      output: ['SELECT', '*', 'FROM', '`table`'],
      description: 'no spaces'
    },
    {
      input: 'SELECT/* comment */bar/* comment */FROM`foo`',
      output: [ 'SELECT', '/* comment */', 'bar', '/* comment */', 'FROM', '`foo`' ],
      description: 'no spaces with comments'
    },
  ]) {
    if (!notSqlite) {
      database.prepare(input)
    }
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
