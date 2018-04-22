const extractDashComments = require('./extractDashComments')
const extractStarComments = require('./extractStarComments')

function extractComments (sql: string): Array<string> {
  return extractStarComments(sql).reduce((codeBlocks, code) => {
    return codeBlocks.concat(extractDashComments(code))
  }, [])
}

module.exports = extractComments
