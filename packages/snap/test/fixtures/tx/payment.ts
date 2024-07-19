import { Payment } from 'xrpl';

export const PAYMENT: Payment = {
  TransactionType: 'Payment',
  Account: 'rM9WCfJU6udpFkvKThRaFHDMsp7L8rpgN',
  Amount: {
    currency: 'FOO',
    value: '4000',
    issuer: 'rPzwM2JfCSDjhbesdTCqFjWWdK7eFtTwZz',
  },
  Destination: 'rPzwM2JfCSDjhbesdTCqFjWWdK7eFtTwZz',
  Flags: 131072,
  Sequence: 21970996,
  Fee: '12',
  LastLedgerSequence: 21971016,
};
