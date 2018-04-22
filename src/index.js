const sql92Operators = require('sql92-operators')

const extractComments = require('./extractComments')
const isComment = require('./isComment')
const isQuoted = require('./isQuoted')
const splitOnQuotes = require('./splitOnQuotes')
const splitOnSpaces = require('./splitOnSpaces')
const splitOnSpecialChars = require('./splitOnSpecialChars')
const splitOnOperators = require('./splitOnOperators')

type SqlDialect = {
  operators?: Array<string>
}

function sqlTokenizer (sqlDialect?: SqlDialect): (string) => Array<string> {
  // Defaults to SQL92.
  if (typeof sqlDialect === 'undefined') {
    sqlDialect = {}
  }

  if (typeof sqlDialect.operators === 'undefined') {
    sqlDialect.operators = sql92Operators
  }

  return (sql: string): Array<string> => extractComments(sql).reduce(
    (tokens, block) => (
      tokens.concat(isComment(block) ? block : splitOnQuotes(block))
    ), []
  ).reduce(
    (tokens, block) => (
      tokens.concat(
        (isComment(block) || isQuoted(block)) ? block : splitOnSpaces(block))
    ), []
  ).reduce(
    (tokens, block) => (
      tokens.concat(
        (isComment(block) || isQuoted(block)) ? block : splitOnSpecialChars(block))
    ), []
  ).reduce(
    (tokens, block) => (
      tokens.concat(
        (isComment(block) || isQuoted(block)) ? block : splitOnOperators(sqlDialect.operators)(block))
    ), []
  )
}

module.exports = sqlTokenizer
