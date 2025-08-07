/**
 * @param {string} sql
 * @returns {string[]}
 */
export const extractQuotes = (sql) => {
  if (!sql) return []

  const blocks = []

  let isInsideSingleQuotes = false
    , isInsideDoubleQuotes = false
    , isInsideBackticks = false
    , currentBlock = ''

  for (let i = 0; i < sql.length; i++) {
    const character = sql[i]
    const nextCharacter = i < sql.length - 1 ? sql[i + 1] : ''

    if (character === "'" && !isInsideDoubleQuotes && !isInsideBackticks) {
      // Handle escaped single quotes (double single quotes)
      if (nextCharacter === "'" && isInsideSingleQuotes) {
        currentBlock += character + nextCharacter
        i++ // Skip the next character as we've processed it
        continue
      }

      // Toggle single quote state
      if (isInsideSingleQuotes) {
        // End of single quoted block
        currentBlock += character
        blocks.push(currentBlock)
        currentBlock = ''
        isInsideSingleQuotes = false
      } else {
        // Start of single quoted block
        if (currentBlock) {
          blocks.push(currentBlock)
          currentBlock = ''
        }
        currentBlock += character
        isInsideSingleQuotes = true
      }
    } else if (character === '"' && !isInsideSingleQuotes && !isInsideBackticks) {
      // Toggle double quote state
      if (isInsideDoubleQuotes) {
        // End of double quoted block
        currentBlock += character
        blocks.push(currentBlock)
        currentBlock = ''
        isInsideDoubleQuotes = false
      } else {
        // Start of double quoted block
        if (currentBlock) {
          blocks.push(currentBlock)
          currentBlock = ''
        }
        currentBlock += character
        isInsideDoubleQuotes = true
      }
    } else if (character === '`' && !isInsideSingleQuotes && !isInsideDoubleQuotes) {
      // Toggle backtick state
      if (isInsideBackticks) {
        // End of backtick quoted block
        currentBlock += character
        blocks.push(currentBlock)
        currentBlock = ''
        isInsideBackticks = false
      } else {
        // Start of backtick quoted block
        if (currentBlock) {
          blocks.push(currentBlock)
          currentBlock = ''
        }
        currentBlock += character
        isInsideBackticks = true
      }
    } else {
      // Regular character
      currentBlock += character
    }
  }

  // Add any remaining block
  if (currentBlock) {
    blocks.push(currentBlock)
  }

  // Filter out empty blocks
  return blocks.filter(block => block !== '')
}
