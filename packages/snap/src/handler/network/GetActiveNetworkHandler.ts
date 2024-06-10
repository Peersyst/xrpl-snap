import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';

export const GetActiveNetworkMethod = 'xrpl_getActiveNetwork';

export class GetActiveNetworkHandler implements IHandler<typeof GetActiveNetworkMethod> {
  constructor(protected readonly context: Context) {}

  async handle() {
    const { activeNetwork } = await this.context.stateManager.get();
    return activeNetwork;
  }
}
