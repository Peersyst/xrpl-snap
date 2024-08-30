import { InvalidParamsError, UserRejectedRequestError } from '@metamask/snaps-sdk';

import type { Context } from '../../core/Context';
import type { Network } from '../../core/StateManager';
import { ChangeNetworkDialog } from '../../dialog/network/ChangeNetworkDialog';
import type { IHandler } from '../IHandler';

export const ChangeNetworkMethod = 'xrpl_changeNetwork';

export class ChangeNetworkHandler implements IHandler<typeof ChangeNetworkMethod> {
  constructor(protected readonly context: Context) {}

  async handle(origin: string, params: { chainId: number }): Promise<Network> {
    const { networks, activeNetwork } = await this.context.stateManager.get();

    if (activeNetwork.chainId === params.chainId) {
      throw new InvalidParamsError(`The network with chainId ${params.chainId} is already the active network.`);
    }

    const network = networks.find(({ chainId }) => chainId === params.chainId);
    if (!network) {
      throw new InvalidParamsError(`network with chainId ${params.chainId} not found`);
    }

    const success = await ChangeNetworkDialog.prompt(origin, network);
    if (!success) {
      throw new UserRejectedRequestError();
    }

    await this.context.stateManager.set({ activeNetwork: network });
    await this.context.provider.changeNode(network.nodeUrl);

    return network;
  }
}
