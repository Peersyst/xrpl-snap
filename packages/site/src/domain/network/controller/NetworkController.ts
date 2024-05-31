import { Network } from 'common/models/network/network.types';

const DEFAULT_NETWORKS: Network[] = [
  {
    chainId: 1,
    name: 'XRPL Mainnet',
    nodeUrl: 'https://xrplcluster.com',
    explorerUrl: 'https://livenet.xrpl.org',
  },
  {
    chainId: 2,
    name: 'XRPL Testnet',
    nodeUrl: 'https://s.altnet.rippletest.net:51234',
    explorerUrl: 'https://livenet.xrpl.org',
  },
];

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class NetworkController {
  async getStoredNetworks(): Promise<Network[]> {
    await sleep(1000);
    return Promise.resolve(DEFAULT_NETWORKS);
  }

  async getActiveNetwork(): Promise<Network> {
    await sleep(1000);
    return Promise.resolve(DEFAULT_NETWORKS[0]!);
  }

  async changeNetwork(_network: Network): Promise<void> {
    await sleep(1000);
  }
}
