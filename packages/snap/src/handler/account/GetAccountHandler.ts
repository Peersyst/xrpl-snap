import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';

export const GetAccount = 'xrpl_getAccount';
export type GetAccountMethod = typeof GetAccount;
export type GetAccountParams = void;
export type GetAccountReturn = { account: string; publicKey: string };

export class GetAccountHandler implements IHandler<GetAccountParams> {
  constructor(protected readonly context: Context) {}

  async handle(): Promise<GetAccountReturn> {
    return {
      account: this.context.wallet.address,
      publicKey: this.context.wallet.publicKey,
    };
  }
}
