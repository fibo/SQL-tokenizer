function splitOnQuotes (sql: string): Array<string> {
  let blocks = []

  let isInsideQuotes = sql.substring(0, 1) === "'"

  sql.split("'").forEach(function (currentValue, index, array) {
    if (isInsideQuotes) {
      isInsideQuotes = false
      blocks.push(`'${currentValue}'`)
    } else {
      isInsideQuotes = true
      blocks.push(currentValue)
    }
  })

  // Every empty block is an escaped quote.
  // select 'O ''Reilly' from mytable
  // [ 'select ', '\'O \'', '', '\'Reilly\'', ' from mytable' ]
  return blocks.reduce(function (accumulator, currentValue, currentIndex, array) {
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

module.exports = splitOnQuotes
