import type { Context } from '../../core/Context';
import { SignAndSubmitHandler, SignAndSubmitMethod } from './SignAndSubmitHandler';
import { SignHandler, SignMethod } from './SignHandler';
import { SignMessageHandler, SignMessageMethod } from './SignMessageHandler';
import { SubmitHandler, SubmitMethod } from './SubmitHandler';
export declare type TransactionMethod = typeof SignAndSubmitMethod | typeof SubmitMethod | typeof SignMethod | typeof SignMessageMethod;
export declare const TransactionHandlerFactory: (context: Context) => {
    xrpl_signAndSubmit: SignAndSubmitHandler;
    xrpl_submit: SubmitHandler;
    xrpl_sign: SignHandler;
    xrpl_signMessage: SignMessageHandler;
};
