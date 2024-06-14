import type { Context } from '../../core/Context';
import type { ExtractFamilySeedMethod, ExtractFamilySeedHandler } from './ExtractFamilySeedHandler';
import type { GetAccountMethod, GetAccountHandler } from './GetAccountHandler';

export declare type AccountMethod = typeof GetAccountMethod | typeof ExtractFamilySeedMethod;
export declare const AccountHandlerFactory: (context: Context) => {
  xrpl_getAccount: GetAccountHandler;
  xrpl_extractFamilySeed: ExtractFamilySeedHandler;
};
