import { type Json } from '@metamask/snaps-sdk';

import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';

export declare const ExtractFamilySeedMethod = 'xrpl_extractFamilySeed';
export declare class ExtractFamilySeedHandler implements IHandler<typeof ExtractFamilySeedMethod> {
  protected readonly context: Context;

  constructor(context: Context);

  handle(): Promise<Json>;
}
