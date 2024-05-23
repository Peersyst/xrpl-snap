import type { Context } from '../../core/Context';
import type { Network } from '../../core/StateManager';
import type { IHandler } from '../IHandler';

export const GetStoredNetworks = 'xrpl_getStoredNetworks';
export type GetStoredNetworkMethod = typeof GetStoredNetworks;
export type GetStoredNetworkParams = void;

export class GetStoredNetworksHandler
  implements IHandler<GetStoredNetworkParams>
{
  constructor(protected readonly context: Context) {}

  async handle(): Promise<Network[]> {
    const state = await this.context.stateManager.get();
    return state.networks;
  }
}
