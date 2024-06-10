import type { Token } from 'common/models';

import { decimalToInt, intToDecimal } from './number/numberConversion';

export default class Amount {
  /**
   * Amount as integer
   */
  amount: string;

  /**
   * Amount decimals
   */
  decimals: number;

  /**
   * Amount currency
   */
  currency: string;

  constructor(amount: string, decimals: number, currency: string) {
    this.amount = amount;
    this.decimals = decimals;
    this.currency = currency;
  }

  // eslint-disable-next-line no-restricted-syntax
  private toAmountFormat(amount: string | number): string {
    return decimalToInt(amount, this.decimals);
  }

  /**
   * Formats the amount with decimals
   */
  formatAmount(): string {
    return intToDecimal(this.amount, this.decimals);
  }

  /**
   * Checks if the amount is greater than the payment
   * @param payment - Amount to pay with decimals
   */
  canPay(payment: string | number): boolean {
    return BigNumber(this.amount).gte(BigNumber(this.toAmountFormat(payment)));
  }

  /**
   * Adds the amount to the current amount
   * @param amount - Amount to add as an integer in string format
   * @returns A new Amount instance
   */
  plus(amount: string | Amount): Amount {
    const value = amount instanceof Amount ? amount.amount : amount;
    return new Amount(BigNumber(this.amount).plus(BigNumber(value)).toString(), this.decimals, this.currency);
  }

  /**
   * Subtracts the amount to the current amount
   * @param amount - Amount to subtract as an integer in string format or an `Amount`
   * @returns A new Amount instance
   */
  minus(amount: string | Amount): Amount {
    const value = amount instanceof Amount ? amount.amount : amount;
    return new Amount(BigNumber(this.amount).minus(BigNumber(value)).toString(), this.decimals, this.currency);
  }

  /**
   * Compares if the amount is greater than the given amount
   * @param amount - Amount to compare as an integer in string format or an `Amount`
   * @returns If the amount is greater than the given amount
   */
  gt(amount: string | Amount): boolean {
    const value = amount instanceof Amount ? amount.amount : amount;
    return BigNumber(this.amount).gt(BigNumber(value));
  }

  /**
   * Compares if the amount is greater than or equal to the given amount
   * @param amount - Amount to compare as an integer in string format or an `Amount`
   * @returns If the amount is greater than or equal to the given amount
   */
  gte(amount: string | Amount): boolean {
    const value = amount instanceof Amount ? amount.amount : amount;
    return BigNumber(this.amount).gte(BigNumber(value));
  }

  /**
   * Compares if the amount is lower than the given amount
   * @param amount - Amount to compare as an integer in string format or an `Amount`
   * @returns If the amount is lower than the given amount
   */
  lt(amount: string | Amount): boolean {
    const value = amount instanceof Amount ? amount.amount : amount;
    return BigNumber(this.amount).gt(BigNumber(value));
  }

  /**
   * Compares if the amount is lower than or equal to the given amount
   * @param amount - Amount to compare as an integer in string format or an `Amount`
   * @returns If the amount is lower than or equal to the given amount
   */
  lte(amount: string | Amount): boolean {
    const value = amount instanceof Amount ? amount.amount : amount;
    return BigNumber(this.amount).gte(BigNumber(value));
  }

  /**
   * Compares if the amount equals to the given amount
   * @param amount - Amount to compare as an integer in string format or an `Amount`
   * @returns If the amount is equal to the given amount
   */
  eq(amount: string | Amount): boolean {
    const value = amount instanceof Amount ? amount.amount : amount;
    return BigNumber(this.amount).eq(BigNumber(value));
  }

  /**
   * Creates an Amount from an integer represented token
   * @param amount - The amount as a string integer
   * @param token - The token of the amount
   * @returns An Amount instance
   */
  static fromIntToken(amount: string, token: Token): Amount {
    return new Amount(amount, token.decimals, token.currency);
  }

  /**
   * Creates an Amount from a decimal represented token
   * @param amount - The amount as a string with decimals
   * @param token - The token of the amount
   * @returns An Amount instance
   */
  static fromDecToken(amount: string, token: Token): Amount {
    return new Amount(decimalToInt(amount, token.decimals), token.decimals, token.currency);
  }
}
