const isWhiteSpace = (character) => (
  (character === ' ') || (character === '\t')
)

function splitOnSpaces (sql: string): Array<string> {
  return sql.split('').reduce(
    (blocks, character, index) => {
      const isSpace = isWhiteSpace(character)
      const numBlocks = blocks.length

      if (numBlocks > 0) {
        const lastBlock = blocks[numBlocks - 1]
        // It is enough to check for first char, to know if last block
        // is a block of space characters.
        const lastBlockIsSpace = isWhiteSpace(lastBlock[0])

        const previousBlocks = blocks.slice(0, numBlocks - 1)

        if (isSpace === lastBlockIsSpace) {
          // Character and last block are of the same type, that is both
          // are spaces or both are not spaces. In this case, character is
          // appended to last block.
          return previousBlocks.concat(lastBlock + character)
        } else {
          // Character and last block are of not of the same type, hence
          // character will start a new block.
          return previousBlocks.concat([lastBlock, character])
        }
      } else {
        return [character]
      }
    }, []
  )
}

module.exports = splitOnSpaces
