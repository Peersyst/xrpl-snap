import type { Context } from '../../core/Context';
import { ExtractFamilySeedMethod, ExtractFamilySeedHandler } from './ExtractFamilySeedHandler';
import { GetAccountMethod, GetAccountHandler } from './GetAccountHandler';

export type AccountMethod = typeof GetAccountMethod | typeof ExtractFamilySeedMethod;

export const AccountHandlerFactory = (context: Context) => ({
  [GetAccountMethod]: new GetAccountHandler(context),
  [ExtractFamilySeedMethod]: new ExtractFamilySeedHandler(context),
});
