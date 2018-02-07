const isSpaceLikeChar = (x) => {
  return (x === '\n') || (x === '\r') || (x === '\t') || (x === ' ')
}

function sqlTokenizer () {
  return function (sql: string): Array<string> {
    let tokens = []

    // Analyze single quotes first. They are special characters in SQL.

    // No SQL statement can start with a quoted word.
    let isQuoted = false
    let currentQuotedValue = ''

    sql.split("'").forEach(function (currentValue, index, array) {
      let nextValue

      if (isQuoted) {
        // Concatenate currentValue with currentQuotedValue, if any, cause
        // previous value could be quoted as well.
        if (currentQuotedValue === '') {
          currentQuotedValue = currentValue
        } else {
          currentQuotedValue += "'" + currentValue
        }

        // Return if it is last element, otherwise nextValue will be undefined.
        if (index === array.length - 1) {
          tokens.push("'" + currentQuotedValue)

          return
        } else {
          // A single quote can be escaped by another single quote.
          //
          // > var sql = "select 'O''Reilly';"
          // > sql.split(/'/)
          // [ 'select ', 'O', '', 'Reilly', ';' ]

          nextValue = array[index + 1]

          // If currentValue is quoted and two consecutive single quotes are found,
          // return to avoid toggling the isQuoted flag, hence nextValue will
          // be considered quoted and concatenated to currentQuotedValue.
          //
          // Otherwise just push the quoted token found.
          if (nextValue === '') {
            return
          } else {
            tokens.push("'" + currentQuotedValue + "'")
          }
        }
      } else {
        // Consider double quotes, spaces, new lines and comments.

        const firstChar = currentValue[0]

        // TODO let isDoubleQuoted = firstChar === '"'
        let isSpaceLikeToken = isSpaceLikeChar(firstChar)
        let currentToken = ''

        currentValue.split('').forEach(function (currentChar, index, array) {
          const isLastChar = index === array.length - 1

          if (isSpaceLikeToken) {
            if (isSpaceLikeChar(currentChar)) {
              currentToken += currentChar
            } else {
              tokens.push(currentToken)
              currentToken = currentChar
              isSpaceLikeToken = false
            }
          } else {
            if (isSpaceLikeChar(currentChar)) {
              tokens.push(currentToken)
              currentToken = currentChar
              isSpaceLikeToken = true
            } else {
              currentToken += currentChar
            }
          }

          if (isLastChar) {
            tokens.push(currentToken)
          }
        })
      }

      // Toggle the isQuoted flag:
      // if currentValue is quoted the next one will not, and viceversa.
      isQuoted = !isQuoted
    })

    return tokens
  }
}

module.exports = sqlTokenizer
