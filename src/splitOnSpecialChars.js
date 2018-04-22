const specialChars = [',', ';']

function splitOnSpecialChars (sql: string): Array<string> {
  return sql.split('').reduce(
    (blocks, character) => {
      const isSpecialChar = specialChars.indexOf(character) > -1
      const numBlocks = blocks.length

      if (numBlocks > 0) {
        const lastBlock = blocks[numBlocks - 1]
        const previousBlocks = blocks.slice(0, numBlocks - 1)
        const lastBlockIsSpecialChar = specialChars.indexOf(lastBlock) > -1

        if (isSpecialChar || lastBlockIsSpecialChar) {
          return blocks.concat(character)
        } else {
          return previousBlocks.concat(lastBlock + character)
        }
      } else {
        return [character]
      }
    }, []
  )
}

module.exports = splitOnSpecialChars
