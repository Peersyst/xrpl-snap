import type { AMMVote } from 'xrpl';

export const AMM_VOTE: AMMVote = {
  TransactionType: 'AMMVote',
  Account: 'rWYkbWkCeg8dP6rXALnjgZSjjLyih5NXm',
  Asset: {
    currency: 'XRP',
  },
  Asset2: {
    currency: 'ETH',
    issuer: 'rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd',
  },
  TradingFee: 25,
  Sequence: 1337,
};
