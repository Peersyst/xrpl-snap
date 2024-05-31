import type { Json } from '@metamask/snaps-sdk';

import type { Context } from '../../core/Context';
import { ExtractPrivateKeyDialog } from '../../dialog/account/ExtractPrivateKeyDialog';
import { ExtractPrivateKeyRequestDialog } from '../../dialog/account/ExtractPrivateKeyRequestDialog';
import type { IHandler } from '../IHandler';

export const ExtractPrivateKeyMethod = 'xrpl_extractPrivateKey';

export class ExtractPrivateKeyHandler
  implements IHandler<typeof ExtractPrivateKeyMethod>
{
  constructor(protected readonly context: Context) {}

  async handle(): Promise<Json> {
    const res = await ExtractPrivateKeyRequestDialog.prompt();
    if (!res) {
      throw new Error('user declined');
    }
    await ExtractPrivateKeyDialog.prompt(this.context.wallet.privateKey);
    return {};
  }
}
