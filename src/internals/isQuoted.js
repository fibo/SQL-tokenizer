/**
 * @param {string} block
 * @returns {boolean}
 */
export const isQuoted = (block) => {
  const start = block[0]
  const end = block[block.length - 1]

  const isDouble = start === '"' && end === '"'

  const isSingle = start === "'" && end === "'"

  return isDouble || isSingle
}
