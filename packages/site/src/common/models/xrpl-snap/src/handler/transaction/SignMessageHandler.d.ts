import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';
export declare const SignMessageMethod = "xrpl_signMessage";
export declare class SignMessageHandler implements IHandler<typeof SignMessageMethod> {
    protected readonly context: Context;
    constructor(context: Context);
    handle(origin: string, params: {
        message: string;
    }): Promise<{
        signature: string;
    }>;
}
