import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { splitOnSingleQuotes as split } from '#internals/splitOnSingleQuotes.js'

test('splitOnSingleQuotes', () => {
  assert.deepEqual(split('select'), ['select'], 'single word')
  assert.deepEqual(split("'alias'"), ["'alias'"], 'single quoted word')
  assert.deepEqual(split("select 'hello world' from mytable"), ['select ', "'hello world'", ' from mytable'], 'single quotes')
  assert.deepEqual(split("select 'O''Reilly' from mytable"), ['select ', "'O''Reilly'", ' from mytable'], 'escape quotes')
  assert.deepEqual(split("select 'hello world'"), ['select ', "'hello world'"], 'single quotes, last char is a quote')
})
