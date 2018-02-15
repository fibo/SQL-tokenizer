function isQuoted (val) {
  return (val.substring(0, 1) === "'") && (val.substring(val.length, 1) === "'")
}

module.exports = isQuoted
