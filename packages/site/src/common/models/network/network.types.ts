export type BlockchainAddressType = 'address' | 'tx';

export type Network = {
  chainId: number;
  name: string;
  nodeUrl: string;
  explorerUrl?: string;
};

/**
 * https://xrpl.org/docs/concepts/accounts/reserves
 */
export type NetworkReserve = {
  baseReserveCostInXrp: string;
  ownerReserveCostInXrpPerItem: string;
};

export enum NetworkChainId {
  MAINNET = 0,
  TESTNET = 1,
  DEVNET = 2,
}
