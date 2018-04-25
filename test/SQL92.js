/* eslint-disable no-tabs */

const test = require('tape')

const tokenize = require('../src/index')()

test('SQL92 tokenizer', (t) => {
  t.deepEqual(tokenize('select'), ['select'])
  t.deepEqual(tokenize('-- select 1'), ['-- select 1'], 'dash comment, whole line')
  t.deepEqual(tokenize(`select
1`), ['select', '\n', '1'], 'newline')
  t.deepEqual(tokenize('  select   1'), ['  ', 'select', '   ', '1'], 'spaces')
  t.deepEqual(tokenize('select * from sales '), ['select', ' ', '*', ' ', 'from', ' ', 'sales', ' '], 'select star')
  t.deepEqual(tokenize('select 1 -- this is a comment'), ['select', ' ', '1', ' ', '-- this is a comment'], 'dash comment, partial line')
  t.deepEqual(tokenize("  select  'x'   as  y"), ['  ', 'select', '  ', "'x'", '   ', 'as', '  ', 'y'], 'many space chars')
  t.deepEqual(tokenize('select 1,2'), ['select', ' ', '1', ',', '2'], 'commas')
  t.deepEqual(tokenize(`select -- this is a comment
1 -- on multiple lines`), [ 'select', ' ', '-- this is a comment', '\n', '1', ' ', '-- on multiple lines' ], 'dash comment, partial line')
  t.deepEqual(tokenize('select * from revenue'), ['select', ' ', '*', ' ', 'from', ' ', 'revenue'], 'basic query')
  t.deepEqual(tokenize("select 'hello world'"), ['select', ' ', "'hello world'"], 'single quotes')
  t.deepEqual(tokenize(`select 'O''Reilly' as "book shelf"`), ['select', ' ', "'O''Reilly'", ' ', 'as', ' ', '"book shelf"'], 'mixed quotes')

  t.deepEqual(tokenize(`
SELECT COUNT(*) AS num
FROM (
	SELECT *
	FROM mytable
	WHERE yyyymmdd=20170101
		AND country IN ('IT','US')
)
`), [
    '\n',
    'SELECT', ' ', 'COUNT', '(', '*', ')', ' ', 'AS', ' ', 'num', '\n',
    'FROM', ' ', '(', '\n',
    '\t', 'SELECT', ' ', '*', '\n',
    '\t', 'FROM', ' ', 'mytable', '\n',
    '\t', 'WHERE', ' ', 'yyyymmdd', '=', '20170101', '\n',
    '\t\t', 'AND', ' ', 'country', ' ', 'IN', ' ', '(', "'IT'", ',', "'US'", ')', '\n',
    ')', '\n'
  ], 'indentation is preserved')

  t.end()
})
