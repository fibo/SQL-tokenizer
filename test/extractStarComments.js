const test = require('tape')

const extract = require('../src/extractStarComments')

test('extractStarComments', (t) => {
  t.deepEqual(extract('select'), ['select'], 'single word')
  t.deepEqual(extract('/* /**/'), ['/* /**/'], 'comment with special chars')
  t.deepEqual(extract('/* comment */ select 1'), ['/* comment */', ' select 1'], 'simple comment')
  t.deepEqual(extract('/* comment */ select 1 /* from foo */'), ['/* comment */', ' select 1 ', '/* from foo */'], 'many comments')
  t.deepEqual(extract(`
/* comment */
select 1 -- ok

/* from foo */
`), ['\n', '/* comment */', '\nselect 1 -- ok\n\n', '/* from foo */', '\n'],
  'comments on many rows')

  t.end()
})
