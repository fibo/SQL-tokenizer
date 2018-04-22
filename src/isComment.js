function isComment (block: string): boolean {
  const isDashComment = block.substring(0, 2) === '--'

  const isStarComment = (
    (block.substring(0, 2) === '/*') &&
    (block.substring(block.length - 2, block.length) === '*/')
  )

  return isDashComment || isStarComment
}

module.exports = isComment
