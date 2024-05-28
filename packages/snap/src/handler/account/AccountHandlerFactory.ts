import type { Context } from '../../core/Context';
import type {
  ExtractPrivateKeyMethod,
  ExtractPrivateKeyParams,
} from './ExtractPrivateKeyHandler';
import {
  ExtractPrivateKey,
  ExtractPrivateKeyHandler,
} from './ExtractPrivateKeyHandler';
import type { GetAccountMethod, GetAccountParams } from './GetAccountHandler';
import { GetAccount, GetAccountHandler } from './GetAccountHandler';

export type AccountMethod = GetAccountMethod | ExtractPrivateKeyMethod;
export type AccountParams = GetAccountParams | ExtractPrivateKeyParams;

export const AccountHandlerFactory = (context: Context) => ({
  [GetAccount]: new GetAccountHandler(context),
  [ExtractPrivateKey]: new ExtractPrivateKeyHandler(context),
});
