import { strict as assert } from 'node:assert'
import { test } from 'node:test'

import { extractBacktickQuotedString, extractSingleAndDoubleQuotes, extractQuotes } from '#internals/extractQuotes.js'

test('extractQuotes', () => {
  for (const { input, output, description } of [
    {
      input: "SELECT `column`, 'foo' FROM `table`",
      output: ['SELECT ', '`column`', ', ', "'foo'", ' FROM ', '`table`'],
      description: 'backticks and quotes',
    },
    // {
    //   input: `"this is '''triple quoted''' text"`,
    //   output: ["this is '''triple quoted''' text"],
    //   description: 'triple quotes',
    // },
    // {
    //   input: `'''SELECT "foo" FROM bar WHERE quz = 'baz''''`,
    //   output: [`'''SELECT "foo" FROM bar WHERE quz = 'baz''''`],
    //   description: 'triple quotes, complex case',
    // },
  ]) {
    assert.deepEqual(extractQuotes(input), output, description)
  }
})

test('extractBacktickQuotedString', () => {
  for (const { input, output, description } of [
    {
      input: 'select `my num` from mytable',
      output: ['select ', "`my num`", ' from mytable'],
      description: 'backtick indentifier',
    },
    {
      input: 'select * from `my table`',
      output: ['select * from ', "`my table`"],
      description: 'backtick at end of input',
    },
  ]) {
    assert.deepEqual(extractBacktickQuotedString(input), output, description)
  }
})

test('extractSingleAndDoubleQuotes', () => {
  for (const { input, output, description } of [
    {
      input: 'select 1 as "my num"',
      output: ['select 1 as ', '"my num"'],
      description: 'double quotes',
    },
    {
      input: "select 'hello world' from mytable",
      output: ['select ', "'hello world'", ' from mytable'],
      description: 'single quotes',
    },
    {
      input: "select 'O''Reilly' from mytable",
      output: ['select ', "'O''Reilly'", ' from mytable'],
      description: 'escape quotes',
    },
    {
      input: "select 'hello world'",
      output: ['select ', "'hello world'"],
      description: 'single quotes, last char is a quote',
    },
    // {
    //   input: `"this is '''triple quoted''' text"`,
    //   output: ["this is '''triple quoted''' text"],
    //   description: 'triple quotes',
    // },
  ]) {
    assert.deepEqual(extractSingleAndDoubleQuotes(input), output, description)
  }
})

