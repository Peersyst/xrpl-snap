import type { Json } from '@metamask/snaps-sdk';
import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';
export declare const ExtractPrivateKeyMethod = "xrpl_extractPrivateKey";
export declare class ExtractPrivateKeyHandler implements IHandler<typeof ExtractPrivateKeyMethod> {
    protected readonly context: Context;
    constructor(context: Context);
    handle(): Promise<Json>;
}
