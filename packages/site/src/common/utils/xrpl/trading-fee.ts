const TRADING_FEE_TOTAL = 1000;

/**
 * Format a trading fee to a percentage.
 *
 * @param fee - The trading fee to format.
 * @returns The formatted trading fee.
 */
export function formatTradingFee(fee: number): number {
  return fee / TRADING_FEE_TOTAL; // Normalize the trading fee to a percentage
}
