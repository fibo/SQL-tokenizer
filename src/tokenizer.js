import { sqlSpecialChars } from './specialChars.js'

import { extractComments } from './internals/extractComments.js'
import { isComment } from './internals/isComment.js'
import { isQuoted } from './internals/isQuoted.js'
import { splitOnQuotes } from './internals/splitOnQuotes.js'
import { splitOnSpaces } from './internals/splitOnSpaces.js'
import { splitOnSpecialChars } from './internals/splitOnSpecialChars.js'

/**
 * Convert SQL statements into a list of tokens.
 * @param {string[]=} specialChars
 * @returns {(string) => string[]}
*/
export const sqlTokenizer = (specialChars = sqlSpecialChars) => {
  /** @param {string} sql */
  return (sql) => extractComments(sql).reduce(
    (tokens, block) => {
      return tokens.concat(
        isComment(block) ? block : splitOnQuotes(block)
      )
    }, []
  ).reduce(
    (tokens, block) => {
      return tokens.concat(
        (isComment(block) || isQuoted(block)) ? block : splitOnSpaces(block)
      )
    }, []
  ).reduce(
    (tokens, block) => {
      return tokens.concat(
        (isComment(block) || isQuoted(block)) ? block : splitOnSpecialChars(specialChars)(block))
    }, []
  )
}
