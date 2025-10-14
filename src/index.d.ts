declare module 'sql-tokenizer' {
  /**
   * List of special SQL characters.
   */
  export const sqlSpecialChars: string[];

  /**
   * Convert SQL statements into a list of tokens.
  */
  export function sqlTokenizer(specialChars?: string[]): (sql: string) => string[]
}
