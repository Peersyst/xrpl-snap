import type { SubmittableTransaction } from 'xrpl';
import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';
export declare const SignMethod = "xrpl_sign";
export declare class SignHandler implements IHandler<typeof SignMethod> {
    protected readonly context: Context;
    constructor(context: Context);
    handle(origin: string, params: SubmittableTransaction): Promise<{
        tx_blob: string;
        hash: string;
    }>;
}
