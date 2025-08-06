/**
 * @param {string} sql
 * @returns {string[]}
 */
export const splitOnDoubleQuotes = (sql) => {
  let isInsideQuotes = sql[0] === '"'

  return sql.split('"').reduce((blocks, block, index, array) => {
    const isEmptyBlock = block === ''
    const isFirstOrLastChar = (index === 0) || (index === array.length - 1)

    // Ignore first or last block if it is empty.
    if (isFirstOrLastChar && isEmptyBlock) return blocks

    if (isInsideQuotes) {
      isInsideQuotes = false
      return blocks.concat(`"${block}"`)
    } else {
      isInsideQuotes = true
      return blocks.concat(block)
    }
  }, [])
}
