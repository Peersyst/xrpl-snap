import type { Context } from '../../core/Context';
import type { Network } from '../../core/StateManager';
import { ChangeNetworkDialog } from '../../dialog/network/ChangeNetworkDialog';
import type { IHandler } from '../IHandler';

export const ChangeNetwork = 'xrpl_changeNetwork';
export type ChangeNetworkMethod = typeof ChangeNetwork;
export type ChangeNetworkParams = { chainId: number };

export class ChangeNetworkHandler implements IHandler<ChangeNetworkParams> {
  constructor(protected readonly context: Context) {}

  async handle(origin: string, params: ChangeNetworkParams): Promise<Network> {
    const { networks } = await this.context.stateManager.get();
    const network = networks.find(({ chainId }) => chainId === params.chainId);
    if (!network) {
      throw new Error(`network with chainId ${params.chainId} not found`);
    }
    const success = await ChangeNetworkDialog.prompt(origin, network);
    if (!success) {
      throw new Error('user declined');
    }
    await this.context.stateManager.set({ activeNetwork: network });
    await this.context.provider.changeNode(network.nodeUrl);
    return network;
  }
}
