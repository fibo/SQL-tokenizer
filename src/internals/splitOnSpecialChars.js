/**
 * @param {string[]} specialChars
 * @return {(string) => string[]}
 */
export const splitOnSpecialChars = (specialChars) => {
  const maxLen = specialChars.reduce((maxLen, item) => (
    Math.max(item.length, maxLen)
  ), 0)

  /**
   * @param {string} sql
   * @return {string[]}
   */
  return (sql) => {
    let skipNumChars = 0

    return sql.split('').reduce(
      (blocks, character, index, array) => {
        const numBlocks = blocks.length

        if (skipNumChars > 0) {
          skipNumChars--
          return blocks
        }

        // Check if it is a special char, look for longest special char first.
        for (let len = maxLen; len > 0; len--) {
          const operator = array.slice(index, index + len).join('')

          if (specialChars.indexOf(operator) > -1) {
            skipNumChars = len - 1
            return blocks.concat(operator)
          }
        }

        // No operator was found:
        // if last block is not an operator, append character to it.
        if (numBlocks > 0) {
          const lastBlock = blocks[numBlocks - 1]
          const previousBlocks = blocks.slice(0, numBlocks - 1)

          if (specialChars.indexOf(lastBlock) > -1) {
            return blocks.concat(character)
          } else {
            return previousBlocks.concat(lastBlock + character)
          }
        } else {
          // No block exists yet, create it with first character.
          return [character]
        }
      }, []
    )
  }
}
