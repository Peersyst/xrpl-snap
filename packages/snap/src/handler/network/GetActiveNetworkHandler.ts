import type { Context } from '../../core/Context';
import type { Network } from '../../core/StateManager';
import type { IHandler } from '../IHandler';

export const GetActiveNetwork = 'xrpl_getActiveNetwork';
export type GetActiveNetworkMethod = typeof GetActiveNetwork;
export type GetActiveNetworkParams = void;

export class GetActiveNetworkHandler
  implements IHandler<GetActiveNetworkParams>
{
  constructor(protected readonly context: Context) {}

  async handle(): Promise<Network> {
    const { activeNetwork } = await this.context.stateManager.get();
    return activeNetwork;
  }
}
