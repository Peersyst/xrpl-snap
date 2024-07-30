export type Network = {
  chainId: number;
  name: string;
  nodeUrl: string;
  explorerUrl?: string;
};

export type State = {
  networks: Network[];
  activeNetwork: Network;
};

/**
 * NetworkID: https://xrpl.org/docs/references/protocol/transactions/common-fields/#networkid-field
 */
export const DEFAULT_NETWORKS: Network[] = [
  {
    chainId: 0,
    name: 'XRPL Mainnet',
    nodeUrl: 'https://xrplcluster.com',
    explorerUrl: 'https://livenet.xrpl.org',
  },
  {
    chainId: 1,
    name: 'XRPL Testnet',
    nodeUrl: 'https://testnet.xrpl-labs.com',
    explorerUrl: 'https://testnet.xrpl.org',
  },
  {
    chainId: 2,
    name: 'XRPL Devnet',
    nodeUrl: 'https://s.devnet.rippletest.net:51234',
    explorerUrl: 'https://devnet.xrpl.org',
  },
];

export const DEFAULT_STATE: State = {
  networks: DEFAULT_NETWORKS,
  activeNetwork: DEFAULT_NETWORKS[0] as Network,
};

export class StateManager {
  currentState: State | undefined;

  async get(): Promise<State> {
    if (this.currentState) {
      return this.currentState;
    }

    const storedState = (await snap.request({
      method: 'snap_manageState',
      params: { operation: 'get' },
    })) as State;

    if (!storedState) {
      return DEFAULT_STATE;
    }

    this.currentState = storedState;
    return storedState;
  }

  async set(newState: Partial<State>): Promise<void> {
    const state = await this.get();
    await snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'update',
        newState: {
          ...state,
          ...newState,
        },
      },
    });
  }
}
