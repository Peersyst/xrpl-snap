import type { Json } from '@metamask/snaps-sdk';

import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';

export const ExtractPrivateKey = 'xrpl_extractPrivateKey';
export type ExtractPrivateKeyMethod = typeof ExtractPrivateKey;
export type ExtractPrivateKeyParams = void;

export class ExtractPrivateKeyHandler
  implements IHandler<ExtractPrivateKeyParams>
{
  constructor(protected readonly context: Context) {}

  async handle(): Promise<Json> {
    throw new Error('not implemented');
  }
}
