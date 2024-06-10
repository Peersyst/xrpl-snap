import type { Context } from "../../core/Context";
import { ChangeNetworkHandler, ChangeNetworkMethod } from "./ChangeNetworkHandler";
import { GetActiveNetworkHandler, GetActiveNetworkMethod } from "./GetActiveNetworkHandler";
import { GetStoredNetworksHandler, GetStoredNetworksMethod } from "./GetStoredNetworksHandler";
import { RequestHandler, RequestMethod } from "./RequestHandler";
export declare type NetworkMethod =
    | typeof ChangeNetworkMethod
    | typeof GetActiveNetworkMethod
    | typeof GetStoredNetworksMethod
    | typeof RequestMethod;
export declare const NetworkHandlerFactory: (context: Context) => {
    xrpl_changeNetwork: ChangeNetworkHandler;
    xrpl_getActiveNetwork: GetActiveNetworkHandler;
    xrpl_getStoredNetworks: GetStoredNetworksHandler;
    xrpl_request: RequestHandler;
};
