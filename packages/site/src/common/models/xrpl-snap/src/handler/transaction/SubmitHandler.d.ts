import type { SubmitRequest } from 'xrpl';
import type { Context } from '../../core/Context';
import type { XrplResponse } from '../../core/Provider';
import type { IHandler } from '../IHandler';
export declare const SubmitMethod = "xrpl_submit";
export declare class SubmitHandler implements IHandler<typeof SubmitMethod> {
    protected readonly context: Context;
    constructor(context: Context);
    handle(_: string, params: {
        tx_blob: string;
    }): Promise<XrplResponse<SubmitRequest>>;
}
