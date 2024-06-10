// TODO(jordi): Get types from the snap

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
  MAINET = 1,
  TESTNET = 2,
}
