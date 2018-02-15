function isDashComment (val) {
  return val.substring(0, 2) === '--'
}

module.exports = isDashComment
