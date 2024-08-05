export type NodeType = 'CreatedNode' | 'ModifiedNode' | 'DeletedNode';

export type PreviousFields = { [field: string]: unknown };

export type FinalFields = { [field: string]: unknown };

export enum LedgerEntryTypes {
  RIPPLE_STATE = 'RippleState',
  ACCOUNT_ROOT = 'AccountRoot',
  AMM = 'AMM',
  DIRECTORY_NODE = 'DirectoryNode',
  CHECK = 'Check',
  ESCROW = 'Escrow',
  OFFER = 'Offer',
}
