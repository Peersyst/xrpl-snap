import type { XChainModifyBridge } from 'xrpl';

export const XCHAIN_MODIFY_BRIDGE: XChainModifyBridge = {
  Account: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
  XChainBridge: {
    LockingChainDoor: 'rGzx83BVoqTYbGn7tiVAnFw7cbxjin13jL',
    LockingChainIssue: {
      currency: 'XRP',
    },
    IssuingChainDoor: 'r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV',
    IssuingChainIssue: {
      currency: 'XRP',
    },
  },
  Fee: '10',
  Flags: 0,
  MinAccountCreateAmount: '10000',
  Sequence: 1,
  SignatureReward: '1000',
  TransactionType: 'XChainModifyBridge',
};
