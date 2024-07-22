import type { AMMBid } from 'xrpl';

export const AMM_BID: AMMBid = {
  TransactionType: 'AMMBid',
  Account: 'rWYkbWkCeg8dP6rXALnjgZSjjLyih5NXm',
  Asset: {
    currency: 'XRP',
  },
  Asset2: {
    currency: 'ETH',
    issuer: 'rP9jPyP5kyvFRb6ZiRghAGw5u8SGAmU4bd',
  },
  BidMin: {
    currency: '039C99CD9AB0B70B32ECDA51EAAE471625608EA2',
    issuer: 'rE54zDvgnghAoPopCgvtiqWNq3dU5y836S',
    value: '50',
  },
  BidMax: {
    currency: '039C99CD9AB0B70B32ECDA51EAAE471625608EA2',
    issuer: 'rE54zDvgnghAoPopCgvtiqWNq3dU5y836S',
    value: '100',
  },
  AuthAccounts: [
    {
      AuthAccount: {
        Account: 'rNZdsTBP5tH1M6GHC6bTreHAp6ouP8iZSh',
      },
    },
    {
      AuthAccount: {
        Account: 'rfpFv97Dwu89FTyUwPjtpZBbuZxTqqgTmH',
      },
    },
    {
      AuthAccount: {
        Account: 'rzzYHPGb8Pa64oqxCzmuffm122bitq3Vb',
      },
    },
    {
      AuthAccount: {
        Account: 'rhwxHxaHok86fe4LykBom1jSJ3RYQJs1h4',
      },
    },
  ],
  Sequence: 1337,
};
