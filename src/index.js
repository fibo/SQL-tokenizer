// const keywords = require('sql92-keywords')
// const operators = [
//   '+', '::', '>', '>=', '<', '<=', '-', '%', '*', '/', ';', '||'
// ]

const extractComments = require('./extractComments')
const isComment = require('./isComment')
const isQuoted = require('./isQuoted')
const splitOnQuotes = require('./splitOnQuotes')
const splitOnSpaces = require('./splitOnSpaces')
// const splitOnOperators = require('./splitOnOperators')

function sqlTokenizer (/* spec: { keywords: Array<string> } */) {
  return (sql: string): Array<string> => extractComments(sql).reduce(
    (tokens, block) => (
      tokens.concat(isComment(block) ? block : splitOnQuotes(block))
    ), []
  ).reduce(
    (tokens, block) => (
      tokens.concat(isQuoted(block) ? block : splitOnSpaces(block))
    ), []
  )
}

module.exports = sqlTokenizer
