function splitOn (operators: Array<string>): (string) => Array<string> {
  const maxOperatorLenght = operators.reduce((maxLenght, operator) => (
    Math.max(operator.length, maxLenght)
  ), 0)

  return function splitOnOperators (sql: string): Array<string> {
    let blocks = []
    let blockIndexes = []
    let skipNumChars = 0

    sql.split('').forEach((currentValue, index, array) => {
      switch (index) {
        case 0:
          blockIndexes.push(index)
          break
        case array.length - 1:
          blockIndexes.push(index + 1)
          break
        default:
          if (skipNumChars > 0) {
            skipNumChars--
          } else {
            // Look for longest operators first.
            for (let len = maxOperatorLenght; len > 0; len--) {
              const currentString = array.slice(index, index + len).join('')

              if (operators.indexOf(currentString) > -1) {
                blockIndexes.push(index)
                blockIndexes.push(index + len)
                skipNumChars = len - 1
              }
            }
          }
      }
    })

    for (let i = 0; i < blockIndexes.length - 1; i++) {
      blocks.push(sql.substring(blockIndexes[i], blockIndexes[i + 1]))
    }

    return blocks
  }
}

module.exports = splitOn
