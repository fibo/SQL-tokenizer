function isQuoted (block: string): boolean {
  const start = block.substring(0, 1)
  const end = block.substring(block.length, 1)

  const isDouble = start === '"' && end === '"'

  const isSingle = start === "'" && end === "'"

  return isDouble || isSingle
}

module.exports = isQuoted
