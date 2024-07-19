import type { SignerListSet } from 'xrpl';

export const SIGNER_LIST_SET: SignerListSet = {
  Flags: 0,
  TransactionType: 'SignerListSet',
  Account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
  Fee: '12',
  SignerQuorum: 3,
  SignerEntries: [
    {
      SignerEntry: {
        Account: 'rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW',
        SignerWeight: 2,
      },
    },
    {
      SignerEntry: {
        Account: 'rUpy3eEg8rqjqfUoLeBnZkscbKbFsKXC3v',
        SignerWeight: 1,
      },
    },
    {
      SignerEntry: {
        Account: 'raKEEVSGnKSD9Zyvxu4z6Pqpm4ABH8FS6n',
        SignerWeight: 1,
      },
    },
  ],
};
