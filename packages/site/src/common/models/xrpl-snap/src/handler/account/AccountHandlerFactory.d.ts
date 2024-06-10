import type { Context } from '../../core/Context';
import type { ExtractPrivateKeyMethod, ExtractPrivateKeyHandler } from './ExtractPrivateKeyHandler';
import type { GetAccountMethod, GetAccountHandler } from './GetAccountHandler';

export declare type AccountMethod = typeof GetAccountMethod | typeof ExtractPrivateKeyMethod;
export declare const AccountHandlerFactory: (context: Context) => {
  xrpl_getAccount: GetAccountHandler;
  xrpl_extractPrivateKey: ExtractPrivateKeyHandler;
};
