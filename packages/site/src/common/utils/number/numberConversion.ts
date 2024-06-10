const BASE_TEN = 10;
const SANITY_CHECK = /^-?[0-9.]+$/u;

/**
 * Converts a number in integer representation to its decimal representation.
 *
 * @param intToConvert - Integer representation to convert to decimal. This can be a string, number, or BigNumber.
 * @param fractionLength - Max length of the fraction.
 * @returns Number in decimal representation.
 * @throws When decimal or integer representation is invalid.
 */
export function intToDecimal(intToConvert: BigNumber.Value, fractionLength: number): string {
  /*
   * Converting to BigNumber and then back to string should remove any
   * decimal point followed by zeros, e.g. '1.00'.
   * Important: specify base BASE_10 to avoid exponential notation, e.g. '1e-7'.
   */
  const int = new BigNumber(intToConvert).toString(BASE_TEN);

  // check that the value is valid and actually a number
  if (typeof intToConvert === 'string' && int === 'NaN') {
    throw new Error(`intToDecimal: invalid value '${intToConvert}', should be a BigNumber or string-encoded number.`);
  }

  // Check integer has no decimal places
  if (int.includes('.')) {
    throw new Error(`intToDecimal: value '${int}' has too many decimal places.`);
  }

  /*
   * This should never happen; the value has already been
   * validated above. This just ensures BigNumber did not do
   * something unexpected.
   */
  if (!SANITY_CHECK.exec(int)) {
    throw new Error(`intToDecimal: failed sanity check -` + ` value '${int}',` + ` does not match (^-?[0-9]+$).`);
  }

  return new BigNumber(int).shiftedBy(-fractionLength).toString(BASE_TEN);
}

/**
 * Converts a number in decimal representation to its integer representation.
 *
 * @param decimalToConvert - Decimal representation to convert to integer. This can be a string, number, or BigNumber.
 * @param fractionLength - Max length of the fraction.
 * @returns Number in integer representation.
 * @throws When decimal or integer representation is invalid.
 */
export function decimalToInt(decimalToConvert: BigNumber.Value, fractionLength: number): string {
  // Important: specify base BASE_TEN to avoid exponential notation, e.g. '1e-7'.
  const decimal = new BigNumber(decimalToConvert).toString(BASE_TEN);

  // check that the value is valid and actually a number
  if (typeof decimalToConvert === 'string' && decimal === 'NaN') {
    throw new Error(`decimalToInt: invalid value '${decimalToConvert}', should be a BigNumber or string-encoded number.`);
  }

  /*
   * This should never happen; the value has already been
   * validated above. This just ensures BigNumber did not do
   * something unexpected.
   */
  if (!SANITY_CHECK.exec(decimal)) {
    throw new Error(`decimalToInt: failed sanity check - value '${decimal}', does not match (^-?[0-9.]+$).`);
  }

  const components = decimal.split('.');
  if (components.length > 2) {
    throw new Error(`decimalToInt: failed sanity check - value '${decimal}' has too many decimal points.`);
  }

  const fraction = components[1] || '0';
  if (fraction.length > fractionLength) {
    throw new Error(`decimalToInt: value '${decimal}' has too many decimal places.`);
  }

  return new BigNumber(decimal).shiftedBy(fractionLength).toString(BASE_TEN);
}
