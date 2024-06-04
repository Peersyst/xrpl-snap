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

const DEFAULT_NETWORKS = [
  {
    chainId: 1,
    name: 'XRPL Mainnet',
    nodeUrl: 'https://xrplcluster.com',
    explorerUrl: 'https://livenet.xrpl.org',
  },
  {
    chainId: 2,
    name: 'XRPL Testnet',
    nodeUrl: 'https://testnet.xrpl-labs.com',
    explorerUrl: 'https://livenet.xrpl.org',
  },
];
const DEFAULT_STATE: State = {
  networks: DEFAULT_NETWORKS,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  activeNetwork: DEFAULT_NETWORKS[0]!,
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
