import type { AccountMethod } from './account/AccountHandlerFactory';
import type { HandlerFactory } from './HandlerFactory';
import type { NetworkMethod } from './network/NetworkHandlerFactory';
import type { TransactionMethod } from './transaction/TransactionHandlerFactory';
export declare type HandlerMethod = TransactionMethod | NetworkMethod | AccountMethod;
export declare type HandlerParams<Method extends HandlerMethod> = Parameters<ReturnType<typeof HandlerFactory>[Method]['handle']>[1];
export declare type HandlerReturns<Method extends HandlerMethod> = ReturnType<ReturnType<typeof HandlerFactory>[Method]['handle']>;
