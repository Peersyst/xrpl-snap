import type { Context } from '../../core/Context';
import type { Network } from '../../core/StateManager';
import type { IHandler } from '../IHandler';

export const GetStoredNetworksMethod = 'xrpl_getStoredNetworks';

export class GetStoredNetworksHandler implements IHandler<typeof GetStoredNetworksMethod> {
  constructor(protected readonly context: Context) {}

  async handle(): Promise<Network[]> {
    const state = await this.context.stateManager.get();
    return state.networks;
  }
}
