import Transaction from 'ui/transaction/components/display/Transaction/Transaction';

export const TransactionSkeleton = (): JSX.Element => (
  <Transaction
    tx={{
      TransactionType: 'Payment',
      Account: 'rM9WCfJU6udpFkvKThRaFHDMsp7L8rpgN',
      Amount: {
        currency: 'FOO',
        value: '4000',
        issuer: 'rPzwM2JfCSDjhbesdTCqFjWWdK7eFtTwZz',
      },
      Destination: 'rPzwM2JfCSDjhbesdTCqFjWWdK7eFtTwZz',
      Sequence: 21970996,
      Fee: '12',
      LastLedgerSequence: 21971016,
      meta: {
        meta: {} as any,
        getLPTokenAmount: () => undefined,
        deliveredAmount: undefined,
        affectedNodes: [],
        getAMMAccountID: () => undefined,
        findAssetsChanges: () => undefined,
      },
    }}
    accountAddress="raQwCVAJVqjrVm1Nj5SFRcX8i22BhdC9WA"
    loading
  />
);
