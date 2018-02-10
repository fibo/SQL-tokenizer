function extractStarComments (sql: string): Array<string> {
  let blocks = []
  let blockIndexes = []

  let isInsideComment = sql.substring(0, 2) === '/*'

  sql.split('').forEach(function (currentValue, index, array) {
    const currentTwoChars = array.slice(index, index + 2).join('')
    const previousTwoChars = array.slice(index - 1, index + 1).join('')

    switch (index) {
      case 0:
        blockIndexes.push(index)
        break
      case array.length - 1:
        blockIndexes.push(index + 1)
        break
      default:
        if (isInsideComment) {
          if (previousTwoChars === '*/') {
            isInsideComment = false
            blockIndexes.push(index + 1)
          }
        } else {
          if (currentTwoChars === '/*') {
            isInsideComment = true
            blockIndexes.push(index)
          }
        }
    }
  })

  for (let i = 0; i < blockIndexes.length - 1; i++) {
    blocks.push(sql.substring(blockIndexes[i], blockIndexes[i + 1]))
  }

  return blocks
}

module.exports = extractStarComments
