/**
 * @param {string} block
 * @returns {string[]}
 */
export const extractQuotes = (block) => {
  return extractSingleAndDoubleQuotes(block).reduce((blocks, item) => {
    return blocks.concat(extractBacktickQuotedString(item))
  }, [])
}

/**
 * @param {string} block
 * @returns {string[]}
 */
export const extractSingleAndDoubleQuotes = (block) => {
  if (!block) return []

  const blocks = []
  let currentBlock = ''
  let isInsideSingleQuote = false
  let isInsideDoubleQuote = false

  for (let i = 0; i < block.length; i++) {
    const character = block[i]
    const isLastCharacter = i === block.length - 1

    if (character === "'") {
      if (isInsideSingleQuote) {
        // Single quote escapes single quote.
        // For example to escale quote in O'Reilly string
        //
        //     SELECT 'O''Reilly'
        //
        const isEscaping = block[i + 1] === "'"
        const isEscaped = block[i - 1] === "'"

        if (isEscaping || isEscaped) {
          currentBlock += character
        } else {
          // We are already inside a single quote, we close it.
          currentBlock += character
          blocks.push(currentBlock)
          currentBlock = ''
          isInsideSingleQuote = false
        }
      } else {
        // If we are not inside a single quote, we open it
        blocks.push(currentBlock)
        isInsideSingleQuote = true
        currentBlock = character
      }
    // Same logic applies to double quotes.
    } else if (character === '"') {
      if (isInsideDoubleQuote) {
        // If we are already inside a double quote, we close it
        currentBlock += character
        blocks.push(currentBlock)
        currentBlock = ''
        isInsideDoubleQuote = false
      } else {
        // If we are not inside a double quote, we open it
        blocks.push(currentBlock)
        isInsideDoubleQuote = true
        currentBlock = character
      }
    } else {
      currentBlock += character
    }

    if (isLastCharacter) {
      blocks.push(currentBlock)
    }
  }

  return blocks.filter(block => block !== '')

  // for (let i = 0; i < sql.length; i++) {
  //   const character = sql[i]

  //   if (character === '"') {
  //     // Handle double quotes
  //     if (currentBlock && !isQuotedString(currentBlock)) {
  //       blocks.push(currentBlock)
  //       currentBlock = ''
  //     }
  //     const quotedString = extractDoubleQuotedString(sql, i)
  //     blocks.push(quotedString.content)
  //     i = quotedString.endIndex
  //   } else if (character === '`') {
  //     // Handle backticks
  //     if (currentBlock && !isQuotedString(currentBlock)) {
  //       blocks.push(currentBlock)
  //       currentBlock = ''
  //     }
  //     const quotedString = extractBacktickQuotedString(sql, i)
  //     blocks.push(quotedString.content)
  //     i = quotedString.endIndex
  //   } else if (character === "'") {
  //     // Handle single quotes
  //     if (currentBlock && !isQuotedString(currentBlock)) {
  //       blocks.push(currentBlock)
  //       currentBlock = ''
  //     }
  //     const quotedString = extractSingleQuotedString(sql, i)
  //     blocks.push(quotedString.content)
  //     i = quotedString.endIndex
  //   } else {
  //     // Regular character
  //     currentBlock += character
  //   }
  // }

  // // Add any remaining block
  // if (currentBlock) {
  //   blocks.push(currentBlock)
  // }

  // // Filter out empty blocks
  // return blocks.filter(block => block !== '')
}

/**
 * @param {string} block
 * @returns {string[]}
 */
export const extractBacktickQuotedString = (block) => {
  return block.split('`').reduce((blocks, item, index) => {
    if (index % 2 === 0) {
      // Even index: outside of backticks
      return blocks.concat(item)
    } else {
      // Odd index: inside backticks
      return blocks.concat('`' + item + '`')
    }
  }, []).filter(block => block !== '')
}

