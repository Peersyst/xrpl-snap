/* eslint-disable */
import BigNumber from 'bignumber.js';
import { ValidationError } from 'xrpl';
import type { Amount, IssuedCurrencyAmount } from 'xrpl';

// TODO: Update this when new version of xrpl.js is released
export interface MPTAmount {
  mpt_issuance_id: string;
  value: string;
}

const ISSUED_CURRENCY_SIZE = 3;
const MPTOKEN_SIZE = 2;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

/**
 * Verify the form and type of a string at runtime.
 *
 * @param str - The object to check the form and type of.
 * @returns Whether the string is properly formed.
 */
export function isString(str: unknown): str is string {
  return typeof str === 'string';
}

/**
 * Verify the form and type of an Amount at runtime.
 *
 * @param amount - The object to check the form and type of.
 * @returns Whether the Amount is properly formed.
 */
export function isAmount(amount: unknown): amount is Amount {
  return typeof amount === 'string' || isIssuedCurrency(amount) || isMPTAmount(amount);
}

/**
 * Verify the form and type of an IssuedCurrencyAmount at runtime.
 *
 * @param input - The input to check the form and type of.
 * @returns Whether the IssuedCurrencyAmount is properly formed.
 */
export function isIssuedCurrency(input: unknown): input is IssuedCurrencyAmount {
  return (
    isRecord(input) &&
    Object.keys(input).length === ISSUED_CURRENCY_SIZE &&
    typeof input.value === 'string' &&
    typeof input.issuer === 'string' &&
    typeof input.currency === 'string'
  );
}

/**
 * Verify the form and type of an MPT at runtime.
 *
 * @param input - The input to check the form and type of.
 * @returns Whether the MPTAmount is properly formed.
 */
export function isMPTAmount(input: unknown): input is MPTAmount {
  return (
    isRecord(input) &&
    Object.keys(input).length === MPTOKEN_SIZE &&
    typeof input.value === 'string' &&
    typeof input.mpt_issuance_id === 'string'
  );
}

/**
 * Check if two amounts are equal.
 *
 * @param amount1 - The first amount to compare.
 * @param amount2 - The second amount to compare.
 * @returns Whether the two amounts are equal.
 * @throws When the amounts are not valid.
 */
export function areAmountsEqual(amount1: unknown, amount2: unknown): boolean {
  const isAmount1Invalid = !isAmount(amount1);
  if (isAmount1Invalid || !isAmount(amount2)) {
    throw new ValidationError(
      `Amount: invalid field. Expected Amount but received ${JSON.stringify(isAmount1Invalid ? amount1 : amount2)}`,
    );
  }

  if (isString(amount1) && isString(amount2)) {
    return new BigNumber(amount1).eq(amount2);
  }

  if (isRecord(amount1) && isRecord(amount2)) {
    return Object.entries(amount1).every(([key, value]) => amount2[key] === value);
  }

  return false;
}
