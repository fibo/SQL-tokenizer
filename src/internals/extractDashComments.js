/**
 * @param {string} sql
 * @returns {string[]}
 */
export const extractDashComments = (sql) => {
  const blocks = []
  const blockIndexes = []

  let isInsideComment = sql.substring(0, 2) === '--'

  sql.split('').forEach((currentChar, index, array) => {
    const currentTwoChars = array.slice(index, index + 2).join('')

    const isNewLine = currentChar === '\n' || currentChar === '\r'

    switch (index) {
      case 0:
        if (isNewLine) {
          // TODO handle \r\n
          blockIndexes.push(index, index + 1)
        } else {
          blockIndexes.push(index)
        }

        break
      case array.length - 1:
        if (isNewLine) {
          blockIndexes.push(index, index + 1)
        } else {
          blockIndexes.push(index + 1)
        }

        break
      default:
        if (isNewLine) {
          isInsideComment = false
          blockIndexes.push(index, index + 1)
        }

        if ((currentTwoChars === '--') && !isInsideComment) {
          isInsideComment = true
          blockIndexes.push(index)
        }
    }
  })

  for (let i = 0; i < blockIndexes.length - 1; i++) {
    blocks.push(sql.substring(blockIndexes[i], blockIndexes[i + 1]))
  }

  return blocks
}
