import type { HandlerMethod, HandlerParams, HandlerReturns } from './Handler.types';

export type IHandler<Method extends HandlerMethod> = {
  handle(origin: string, params: HandlerParams<Method>): HandlerReturns<Method>;
};
