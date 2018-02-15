// const keywords = require('sql92-keywords')
const operators = [
  '+', '::', '>', '>=', '<', '<=', '-', '%', '*', '/', ';', '||'
]

const extractDashComments = require('./extractDashComments')
const extractStarComments = require('./extractStarComments')
const isDashComment = require('./isDashComment')
const isQuoted = require('./isQuoted')
const splitOnQuotes = require('./splitOnQuotes')
const splitOnOperators = require('./splitOnOperators')

function sqlTokenizer (/* spec: { keywords: Array<string> } */) {
  return function (sql: string): Array<string> {
    let tokens = []

    extractStarComments(sql).forEach(block1 => {
      extractDashComments(block1).forEach(block2 => {
        splitOnQuotes(block2).forEach(block3 => {
          if (isQuoted(block3) || isDashComment(block3)) {
            tokens.push(block3)
          } else {
            splitOnOperators(operators)(block3).forEach(block4 => {
              tokens.push(block4)
            })
          }
        })
      })
    })

    return tokens
  }
}

module.exports = sqlTokenizer
