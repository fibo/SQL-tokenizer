/**
 * @param {string} sql
 * @returns {string[]}
 */
export const splitOnSingleQuotes = (sql) => {
  let isInsideQuotes = sql[0] === "'"

  return sql.split("'").reduce((blocks, block, index, array) => {
    const isEmptyBlock = block === ''
    const isFirstOrLastChar = (index === 0) || (index === array.length - 1)

    // Ignore first or last block if it is empty.
    if (isFirstOrLastChar && isEmptyBlock) return blocks

    if (isInsideQuotes) {
      isInsideQuotes = false
      return blocks.concat(`'${block}'`)
    } else {
      isInsideQuotes = true
      return blocks.concat(block)
    }
  }, []).reduce((accumulator, currentValue, currentIndex, array) => {
    // Excluding first and last entries, in case argument starts or ends with
    // a quote, every empty block is an escaped quote.
    // select 'O ''Reilly' from mytable
    // [ 'select ', '\'O \'', '', '\'Reilly\'', ' from mytable' ]

    const isEmptyString = currentValue === ''
    const isLastOne = currentIndex === array.length - 1

    if (currentIndex === 0) {
      accumulator = array.slice(0)
    }

    // If statement end with a quote there will be a final emptyString, to be removed.
    if (isEmptyString && isLastOne) {
      return accumulator.slice(0, array.length - 1)
    }

    if (isEmptyString) {
      let numEmptyValues = 0

      for (let i = currentIndex; i < array.length - 1; i++) {
        if (array[i] === '') {
          numEmptyValues++
        } else {
          // Remove empty strings.
          accumulator.splice(currentIndex, numEmptyValues)
          // Merge current and next value.
          accumulator[currentIndex - 1] += accumulator.splice(currentIndex, 1).join('')
          break
        }
      }
    }

    return accumulator
  }, [])
}
