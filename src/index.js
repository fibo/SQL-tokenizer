const sql92Operators = require('sql92-operators')

const extractComments = require('./extractComments')
const isComment = require('./isComment')
const isQuoted = require('./isQuoted')
const splitOnQuotes = require('./splitOnQuotes')
const splitOnSpaces = require('./splitOnSpaces')
const splitOnSpecialChars = require('./splitOnSpecialChars')
const splitOnOperators = require('./splitOnOperators')

function sqlTokenizer (operators?: Array<string>): (string) => Array<string> {
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
        (isComment(block) || isQuoted(block)) ? block : splitOnOperators(operators || sql92Operators)(block))
    ), []
  )
}

module.exports = exports.default = sqlTokenizer
