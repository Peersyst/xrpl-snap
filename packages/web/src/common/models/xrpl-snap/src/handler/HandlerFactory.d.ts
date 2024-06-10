import type { Context } from "../core/Context";
export declare const HandlerFactory: (context: Context) => {
    xrpl_getAccount: import("./account/GetAccountHandler").GetAccountHandler;
    xrpl_extractPrivateKey: import("./account/ExtractPrivateKeyHandler").ExtractPrivateKeyHandler;
    xrpl_changeNetwork: import("./network/ChangeNetworkHandler").ChangeNetworkHandler;
    xrpl_getActiveNetwork: import("./network/GetActiveNetworkHandler").GetActiveNetworkHandler;
    xrpl_getStoredNetworks: import("./network/GetStoredNetworksHandler").GetStoredNetworksHandler;
    xrpl_request: import("./network/RequestHandler").RequestHandler;
    xrpl_signAndSubmit: import("./transaction/SignAndSubmitHandler").SignAndSubmitHandler;
    xrpl_submit: import("./transaction/SubmitHandler").SubmitHandler;
    xrpl_sign: import("./transaction/SignHandler").SignHandler;
    xrpl_signMessage: import("./transaction/SignMessageHandler").SignMessageHandler;
};
