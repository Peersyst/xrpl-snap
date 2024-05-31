import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';

export const GetAccountMethod = 'xrpl_getAccount';

export class GetAccountHandler implements IHandler<typeof GetAccountMethod> {
  constructor(protected readonly context: Context) {}

  async handle() {
    return {
      account: this.context.wallet.address,
      publicKey: this.context.wallet.publicKey,
    };
  }
}
