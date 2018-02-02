function sqlTokenizer () {
  return function (sql) {
    return [sql]
  }
}

module.exports = sqlTokenizer
