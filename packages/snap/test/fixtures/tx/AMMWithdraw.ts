import type { AMMWithdraw } from 'xrpl';

export const AMM_WITHDRAW: AMMWithdraw = {
  TransactionType: 'AMMWithdraw',
  Account: 'rWYkbWkCeg8dP6rXALnjgZSjjLyih5NXm',
  Asset: {
    currency: 'XRP',
  },
  Asset2: {
    currency: 'ETH',
    issuer: 'rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd',
  },
  Sequence: 1337,
  Flags: 0,
};
