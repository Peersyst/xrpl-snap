import type { Context } from '../../core/Context';
import { ExtractPrivateKeyMethod, ExtractPrivateKeyHandler } from './ExtractPrivateKeyHandler';
import { GetAccountMethod, GetAccountHandler } from './GetAccountHandler';

export type AccountMethod = typeof GetAccountMethod | typeof ExtractPrivateKeyMethod;

export const AccountHandlerFactory = (context: Context) => ({
  [GetAccountMethod]: new GetAccountHandler(context),
  [ExtractPrivateKeyMethod]: new ExtractPrivateKeyHandler(context),
});
