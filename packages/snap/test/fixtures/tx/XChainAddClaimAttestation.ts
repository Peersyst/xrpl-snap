import type { XChainAddClaimAttestation } from 'xrpl';

export const XCHAIN_ADD_CLAIM_ATTESTATION: XChainAddClaimAttestation = {
  Account: 'rsqvD8WFFEBBv4nztpoW9YYXJ7eRzLrtc3',
  Amount: '10000000',
  AttestationRewardAccount: 'rsqvD8WFFEBBv4nztpoW9YYXJ7eRzLrtc3',
  AttestationSignerAccount: 'rsqvD8WFFEBBv4nztpoW9YYXJ7eRzLrtc3',
  Destination: 'rJdTJRJZ6GXCCRaamHJgEqVzB7Zy4557Pi',
  Fee: '20',
  LastLedgerSequence: 19,
  OtherChainSource: 'raFcdz1g8LWJDJWJE2ZKLRGdmUmsTyxaym',
  PublicKey: 'ED7541DEC700470F54276C90C333A13CDBB5D341FD43C60CEA12170F6D6D4E1136',
  Sequence: 9,
  Signature:
    '7C175050B08000AD35EEB2D87E16CD3F95A0AEEBF2A049474275153D9D4DD44528FE99AA50E71660A15B0B768E1B90E609BBD5DC7AFAFD45D9705D72D40EA10C',
  TransactionType: 'XChainAddClaimAttestation',
  WasLockingChainSend: 1,
  XChainBridge: {
    IssuingChainDoor: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
    IssuingChainIssue: {
      currency: 'XRP',
    },
    LockingChainDoor: 'rDJVtEuDKr4rj1B3qtW7R5TVWdXV2DY7Qg',
    LockingChainIssue: {
      currency: 'XRP',
    },
  },
  XChainClaimID: '0000000000000001',
};
