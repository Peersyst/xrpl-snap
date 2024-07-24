/**
 * This code is from xprl.js
 */

/**
 * Converts a string to its hex equivalent. Useful for Memos.
 *
 * @param string - The string to convert to Hex.
 * @returns The Hex equivalent of the string.
 * @category Utilities
 */
export function convertStringToHex(string: string): string {
  // eslint-disable-next-line no-restricted-globals
  return Buffer.from(string, 'utf8').toString('hex').toUpperCase();
}

/**
 * Converts hex to its string equivalent. Useful to read the Domain field and some Memos.
 *
 * @param hexStr - The hex to convert to a string.
 * @param encoding - The encoding to use. Defaults to 'utf8' (UTF-8). 'ascii' is also allowed.
 * @returns The converted string.
 * @category Utilities
 */
export function convertHexToString(hexStr: string, encoding: BufferEncoding = 'utf8'): string {
  // eslint-disable-next-line no-restricted-globals
  return Buffer.from(hexStr, 'hex').toString(encoding);
}

export function isHex(text: string): boolean {
  return /^[0-9A-Fa-f]*$/u.test(text);
}
