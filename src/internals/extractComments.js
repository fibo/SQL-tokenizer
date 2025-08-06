import { extractDashComments } from './extractDashComments.js'
import { extractStarComments } from './extractStarComments.js'

/**
 * @param {string} sql
 * @returns {string[]}
 */
export const extractComments = (sql) => {
  return extractStarComments(sql).reduce((codeBlocks, code) => {
    return codeBlocks.concat(extractDashComments(code))
  }, [])
}
