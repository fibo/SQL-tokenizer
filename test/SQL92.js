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
  /*

  t.deepEqual(tokenize(`
SELECT COUNT(    *) AS num
FROM (
	SELECT *
	FROM mytable
	WHERE yyyymmdd=20170101
		AND country IN ( 'IT', 'US' )
		AND (
			categoryid BETWEEN 100 AND 200
			OR productname != 'icecream'
		)
)
  `), [
    'SELECT', 'COUNT', '(', '*', ')', 'AS', 'num',
    'FROM', '(',
    'SELECT', '*',
    'FROM', 'mytable',
    'WHERE', 'yyyymmdd', '=', '20170101',
    'AND', 'country', 'IN', '(', "'IT'", ',', "'US'", ')',
    'AND', '(',
    'categoryid', 'BETWEEN', '100', 'AND', '200',
    'OR', 'productname', '!=', "'icecream'",
    ')',
    ')'
  ], 'example query')
*/

  t.end()
})
