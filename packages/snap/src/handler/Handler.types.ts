import type { AccountMethod } from './account/AccountHandlerFactory';
import type { HandlerFactory } from './HandlerFactory';
import type { NetworkMethod } from './network/NetworkHandlerFactory';
import type { TransactionMethod } from './transaction/TransactionHandlerFactory';

export type HandlerMethod = TransactionMethod | NetworkMethod | AccountMethod;

export type HandlerParams<Method extends HandlerMethod> = Parameters<ReturnType<typeof HandlerFactory>[Method]['handle']>[1];

export type HandlerReturns<Method extends HandlerMethod> = ReturnType<ReturnType<typeof HandlerFactory>[Method]['handle']>;
