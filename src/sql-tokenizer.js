function sqlTokenizer () {
  return function (sql: string): Array<string> {
    return [sql]
  }
}

module.exports = sqlTokenizer
