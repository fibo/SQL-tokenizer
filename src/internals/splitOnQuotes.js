import { splitOnDoubleQuotes } from './splitOnDoubleQuotes.js'
import { splitOnSingleQuotes } from './splitOnSingleQuotes.js'

// TODO splitOnSingleQuotes and splitOnDoubleQuotes should be merged into
// the same function, because a single quote inside a pair of double quotes
// should be ignored; for example
//
//     SELECT 'now' AS "let's go"
//
// implementation should be something like
//
// let isInsideSingleQuotes = false
// let isInsideDoubleQuotes = false
// let escapeSingleQuote = false
//
// return sql.split('').reduce((blocks, character, index, array) => {
//   const nextCharacter = array.slice(index, index + 1).join('')
//
//   if (character === "'") {
//     if (nextCharacter === "'") {
//       escapeSingleQuote = true
//     } else {
//       isInsideSingleQuotes = !isInsideSingleQuotes
//     }
//   }
// }, [])
//

/**
 * @param {string} block
 * @returns {string[]}
 */
export const splitOnQuotes = (block) => {
  return splitOnSingleQuotes(block).reduce((blocks, block) => {
    return blocks.concat(splitOnDoubleQuotes(block))
  }, [])
}
