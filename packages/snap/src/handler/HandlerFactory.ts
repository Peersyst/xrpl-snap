import type { Context } from '../core/Context';
import { AccountHandlerFactory } from './account/AccountHandlerFactory';
import { NetworkHandlerFactory } from './network/NetworkHandlerFactory';
import { TransactionHandlerFactory } from './transaction/TransactionHandlerFactory';

export const HandlerFactory = (context: Context) => ({
  ...TransactionHandlerFactory(context),
  ...NetworkHandlerFactory(context),
  ...AccountHandlerFactory(context),
});
