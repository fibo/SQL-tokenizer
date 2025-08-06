/**
 * List of special SQL characters.
 */
export const sqlSpecialChars = [
  // Generic special characters
  ',', ';', '(', ')',

  // Wildcard character is covered by the multiplication operator.

  // Arithmetic Operators
  '+', '-', '*', '/', '%',

  // Comparison Operators
  '=', '>', '>=', '<', '<=', '<>', '!=',

  // String operators
  '||',

  // Bitwise Operators
  '&', '|', '#', '~', '>>', '<<',

  // Compound Operators
  '+=', '-=', '*=', '/=', '%=', '&=', '|=', '#=', '>>=', '<<=',

  // Casting operators
  '::',

  // Oracle-specific Operators
  '(+)'
]
