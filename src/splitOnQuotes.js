// const splitOnDoubleQuotes = require('./splitOnDoubleQuotes')
const splitOnSingleQuotes = require('./splitOnSingleQuotes')

function splitOnQuotes (block: string): Array<string> {
  return splitOnSingleQuotes(block)
}

module.exports = splitOnQuotes
