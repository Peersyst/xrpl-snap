import type { Json } from '@metamask/snaps-sdk';

import type { Context } from '../../core/Context';
import { ExtractPrivateKeyDialog } from '../../dialog/account/ExtractPrivateKeyDialog';
import { ExtractPrivateKeyRequestDialog } from '../../dialog/account/ExtractPrivateKeyRequestDialog';
import type { IHandler } from '../IHandler';

export const ExtractPrivateKey = 'xrpl_extractPrivateKey';
export type ExtractPrivateKeyMethod = typeof ExtractPrivateKey;
export type ExtractPrivateKeyParams = void;

export class ExtractPrivateKeyHandler
  implements IHandler<ExtractPrivateKeyParams>
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
