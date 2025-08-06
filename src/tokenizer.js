import { sqlOperators } from './operators.js'
import { extractComments } from './internals/extractComments.js'
import { isComment } from './internals/isComment.js'
import { isQuoted } from './internals/isQuoted.js'
import { splitOnOperators } from './internals/splitOnOperators.js'
import { splitOnQuotes } from './internals/splitOnQuotes.js'
import { splitOnSpaces } from './internals/splitOnSpaces.js'
import { splitOnSpecialChars } from './internals/splitOnSpecialChars.js'

/**
 * Convert SQL statements into a list of tokens.
 * @param {string[]=} operators
 * @returns {(string) => string[]}
*/
export const sqlTokenizer = (operators = sqlOperators) => {
  /** @param {string} sql */
  return (sql) => extractComments(sql).reduce(
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
        (isComment(block) || isQuoted(block)) ? block : splitOnOperators(operators)(block))
    ), []
  )
}
