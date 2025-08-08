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
    {
      input: "SELECT `column`, \"O'Reilly\" FROM `table`",
      output: ['SELECT ', '`column`', ', ', `"O'Reilly"`, ' FROM ', '`table`'],
      description: 'backticks and mixed quotes',
    },
    {
      input: `SELECT '''SELECT "foo" FROM bar WHERE quz = "ok"'''`,
      output: ['SELECT ', `'''SELECT "foo" FROM bar WHERE quz = "ok"'''`],
      description: 'triple quotes, complex case',
    },
    {
      input: "INSERT INTO foo (bar) VALUES ('SELECT `funkyColumnName` FROM quux WHERE thing = ''blabla'' AND answer=42')",
      output: ['INSERT INTO foo (bar) VALUES (', "'SELECT `funkyColumnName` FROM quux WHERE thing = ''blabla'' AND answer=42'", ')'],
      description: 'funky quotes'
    },
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
      input: "SELECT 1 AS 'alias'",
      output: ['SELECT 1 AS ', "'alias'"],
      description: 'single quoted word',
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
    {
      input: `SELECT 'text " ';`,
      output: ['SELECT ', `'text " '`, ';'],
      description: 'double quote inside single quotes',
    },
  ]) {
    assert.deepEqual(extractSingleAndDoubleQuotes(input), output, description)
  }
})

