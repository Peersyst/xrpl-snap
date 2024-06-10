import type { Context } from "../../core/Context";
import type { IHandler } from "../IHandler";
export declare const GetAccountMethod = "xrpl_getAccount";
export declare class GetAccountHandler implements IHandler<typeof GetAccountMethod> {
    protected readonly context: Context;
    constructor(context: Context);
    handle(): Promise<{
        account: string;
        publicKey: string;
    }>;
}
