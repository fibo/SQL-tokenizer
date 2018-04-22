/* eslint-disable no-tabs */

const test = require('tape')

const tokenize = require('../src/index')()

test('SQL92 tokenizer', (t) => {
  t.deepEqual(tokenize('select'), ['select'])
  t.deepEqual(tokenize('-- select 1'), ['-- select 1'], 'dash comment, whole line')
  t.deepEqual(tokenize(`select
1`), ['select', '\n', '1'], 'newline')
  /*
  t.deepEqual(tokenize('  select   1'), ['  ', 'select', '   ', '1'], 'spaces')
  t.deepEqual(tokenize("select 'hello world'"), ['select', ' ', "'hello world'"], 'single quotes')
  t.deepEqual(tokenize('select * from sales '), ['select', ' ', '*', ' ', 'from', ' ', 'sales', ' '], 'select star')
  t.deepEqual(tokenize('select 1 -- this is a comment'), ['select', ' ', '1', '-- this is a comment'], 'dash comment, partial line')
  t.deepEqual(tokenize(`select -- this is a comment
1 -- on multiple lines`), ['select', ' ', '1', '-- this is a comment'], 'dash comment, partial line')
  t.deepEqual(tokenize('select 1,2'), ['select', '1', ',', '2'], 'commas')
  t.deepEqual(tokenize("  select  'x'   as  y"), ['select', "'x'", 'as', 'y'], 'internal space chars')
  t.deepEqual(tokenize('group by'), ['group by'], 'GROUP BY')
  t.deepEqual(tokenize('ORDER by'), ['ORDER by'], 'ORDER BY')
  t.deepEqual(tokenize('COUNT(*)'), ['COUNT', '(', '*', ')'], 'COUNT(*)')
  t.deepEqual(tokenize('COUNT (1)'), ['COUNT', '(', '1', ')'], 'COUNT (1)')
  t.deepEqual(tokenize('1::VARCHAR'), ['1::VARCHAR'], 'cast')
  t.deepEqual(tokenize('join'), ['join'], 'JOIN')
  t.deepEqual(tokenize(' right   jOin'), ['right jOin'], 'RIGHT JOIN')
  t.deepEqual(tokenize('  Left    join '), ['Left join'], 'LEFT JOIN')
  t.deepEqual(tokenize('cross Join'), ['cross Join'], 'CROSS JOIN')
  t.deepEqual(tokenize('INNeR Join'), ['INNeR Join'], 'INNER JOIN')
  t.deepEqual(tokenize('full outer join'), ['full outer join'], 'FULL OUTER JOIN')
  t.deepEqual(tokenize('not between'), ['not between'], 'NOT BETWEEN')
  t.deepEqual(tokenize('NOT like'), ['NOT like'], 'NOT LIKE')
  t.deepEqual(tokenize('union all'), ['union all'], 'UNION ALL')
  t.deepEqual(tokenize('Create Table'), ['Create Table'], 'CREATE TABLE')
  t.deepEqual(tokenize('Drop   Table'), ['Drop Table'], 'DROP TABLE')
  t.deepEqual(tokenize('20170701::VARCHAR::DATE'), ['20170701::VARCHAR::DATE'], 'double cast')
  t.deepEqual(tokenize('WHERE foo > bar'), ['WHERE', 'foo', '>', 'bar'], 'comparison operator >')
  t.deepEqual(tokenize('WHERE foo = bar'), ['WHERE', 'foo', '=', 'bar'], 'comparison operator =')
  t.deepEqual(tokenize('WHERE foo < bar'), ['WHERE', 'foo', '<', 'bar'], 'comparison operator <')
  t.deepEqual(tokenize('WHERE foo != bar'), ['WHERE', 'foo', '!=', 'bar'], 'comparison operator !=')
  t.deepEqual(tokenize('WHERE foo >= bar'), ['WHERE', 'foo', '>=', 'bar'], 'comparison operator !=')
  t.deepEqual(tokenize('WHERE foo <= bar'), ['WHERE', 'foo', '<=', 'bar'], 'comparison operator <=')
  t.deepEqual(tokenize('WHERE foo <> bar'), ['WHERE', 'foo', '<>', 'bar'], 'comparison operator <>')

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
