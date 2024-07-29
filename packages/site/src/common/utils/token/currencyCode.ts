import { convertHexToString, convertStringToHex } from 'xrpl';

/**
 * Returns whether a currency code is standard or not
 * From docs: Currency codes must be exactly 3 ASCII characters in length. The following characters are permitted: all uppercase and lowercase letters, digits, as well as the symbols ?, !, @, #, $, %, ^, &, *, <, >, (, ), {, }, [, ], and |.
 * @param currencyCode - Standard or non standard currency code
 */
export function isStandardCurrencyCode(currencyCode: string): boolean {
  return /^[a-zA-Z0-9?!@#$%^&*<>()[\]{}|]{3}$/.test(currencyCode);
}

/**
 * Converts a currency code to the accepted format by xrpl
 * @param currencyCode - Standard or non standard currency code
 * @returns The currency code in hex format if non standard or the same currency code if standard
 */
export function convertCurrencyCode(currencyCode: string): string {
  if (isStandardCurrencyCode(currencyCode)) {
    return currencyCode;
  }
  return convertStringToHex(currencyCode).padEnd(40, '0');
}

/**
 * Parses an xrpl currency code
 * @param currencyCode - A standard or non standard currency code
 * @returns A currency code
 */
export function parseCurrencyCode(currencyCode: string): string {
  if (isStandardCurrencyCode(currencyCode)) {
    return currencyCode;
  }
  if (currencyCode.startsWith('03')) {
    return `LP ${currencyCode.slice(2, 6)}`;
  }

  return convertHexToString(currencyCode).replace(/\0/gu, '');
}
