import type { Context } from '../../core/Context';
import {
  ExtractPrivateKey,
  ExtractPrivateKeyHandler,
} from './ExtractPrivateKeyHandler';
import type { GetAccountMethod, GetAccountParams } from './GetAccountHandler';
import { GetAccount, GetAccountHandler } from './GetAccountHandler';

export type AccountMethod = GetAccountMethod;
export type AccountParams = GetAccountParams;

export const AccountHandlerFactory = (context: Context) => ({
  [GetAccount]: new GetAccountHandler(context),
  [ExtractPrivateKey]: new ExtractPrivateKeyHandler(context),
});
