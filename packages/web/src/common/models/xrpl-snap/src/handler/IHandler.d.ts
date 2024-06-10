import type { HandlerMethod, HandlerParams, HandlerReturns } from "./Handler.types";
export declare type IHandler<Method extends HandlerMethod> = {
    handle(origin: string, params: HandlerParams<Method>): HandlerReturns<Method>;
};
