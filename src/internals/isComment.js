/** @param {string} block
 * @returns {boolean}
 */
export const isComment = (block) => {
  const isDashComment = block.substring(0, 2) === '--'

  const isStarComment = (
    (block.substring(0, 2) === '/*') &&
    (block.substring(block.length - 2, block.length) === '*/')
  )

  return isDashComment || isStarComment
}
