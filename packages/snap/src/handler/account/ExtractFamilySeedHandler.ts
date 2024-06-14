import { UserRejectedRequestError, type Json } from '@metamask/snaps-sdk';

import type { Context } from '../../core/Context';
import { ExtractFamilySeedDialog } from '../../dialog/account/ExtractFamilySeedDialog';
import { ExtractFamilySeedRequestDialog } from '../../dialog/account/ExtractFamilySeedRequestDialog';
import type { IHandler } from '../IHandler';

export const ExtractFamilySeedMethod = 'xrpl_extractFamilySeed';

export class ExtractFamilySeedHandler implements IHandler<typeof ExtractFamilySeedMethod> {
  constructor(protected readonly context: Context) {}

  async handle(): Promise<Json> {
    const res = await ExtractFamilySeedRequestDialog.prompt();
    if (!res) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new UserRejectedRequestError();
    }
    await ExtractFamilySeedDialog.prompt(this.context.wallet.familySeed);
    return {};
  }
}
