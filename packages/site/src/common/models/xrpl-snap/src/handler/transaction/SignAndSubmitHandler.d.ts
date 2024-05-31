import type { SubmitRequest, SubmittableTransaction } from 'xrpl';
import type { Context } from '../../core/Context';
import type { XrplResponse } from '../../core/Provider';
import type { IHandler } from '../IHandler';
export declare const SignAndSubmitMethod = "xrpl_signAndSubmit";
export declare class SignAndSubmitHandler implements IHandler<typeof SignAndSubmitMethod> {
    protected readonly context: Context;
    constructor(context: Context);
    handle(origin: string, params: SubmittableTransaction): Promise<XrplResponse<SubmitRequest>>;
}
