// const keywords = require('sql92-keywords')
// const operators = [
//   '+', '::', '>', '>=', '<', '<=', '-', '%', '*', '/', '||'
// ]

const extractComments = require('./extractComments')
const isComment = require('./isComment')
const isQuoted = require('./isQuoted')
const splitOnQuotes = require('./splitOnQuotes')
const splitOnSpaces = require('./splitOnSpaces')
const splitOnSpecialChars = require('./splitOnSpecialChars')
// const splitOnOperators = require('./splitOnOperators')

function sqlTokenizer (/* spec: { keywords: Array<string> } */) {
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
  )
}

module.exports = sqlTokenizer
