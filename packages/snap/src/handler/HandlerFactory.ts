import type { Context } from '../core/Context';
import type {
  AccountMethod,
  AccountParams,
} from './account/AccountHandlerFactory';
import { AccountHandlerFactory } from './account/AccountHandlerFactory';
import { NetworkHandlerFactory } from './network/NetworkHandlerFactory';
import type {
  NetworkMethod,
  NetworkParams,
} from './network/NetworkHandlerFactory';
import { TransactionHandlerFactory } from './transaction/TransactionHandlerFactory';
import type {
  TransactionMethod,
  TransactionParams,
} from './transaction/TransactionHandlerFactory';

export type HandlerMethod = TransactionMethod | NetworkMethod | AccountMethod;
export type HandlerParams = TransactionParams | NetworkParams | AccountParams;

export const HandlerFactory = (context: Context) => ({
  ...TransactionHandlerFactory(context),
  ...NetworkHandlerFactory(context),
  ...AccountHandlerFactory(context),
});
