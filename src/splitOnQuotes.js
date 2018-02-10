function splitOnQuotes (sql: string): Array<string> {
  let tokens = []

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
      tokens.push(currentValue)
    }

    // Toggle the isQuoted flag:
    // if currentValue is quoted the next one will not, and viceversa.
    isQuoted = !isQuoted
  })

  return tokens
}

module.exports = splitOnQuotes
