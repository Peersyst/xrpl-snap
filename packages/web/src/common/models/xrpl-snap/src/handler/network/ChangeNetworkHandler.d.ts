import type { Context } from "../../core/Context";
import type { Network } from "../../core/StateManager";
import type { IHandler } from "../IHandler";
export declare const ChangeNetworkMethod = "xrpl_changeNetwork";
export declare class ChangeNetworkHandler implements IHandler<typeof ChangeNetworkMethod> {
    protected readonly context: Context;
    constructor(context: Context);
    handle(
        origin: string,
        params: {
            chainId: number;
        },
    ): Promise<Network>;
}
