function isQuoted (block: string): boolean {
  const start = block[0]
  const end = block[block.length - 1]

  const isDouble = start === '"' && end === '"'

  const isSingle = start === "'" && end === "'"

  return isDouble || isSingle
}

module.exports = isQuoted
