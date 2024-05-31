import type { Request as XrplRequest } from 'xrpl';
import type { Context } from '../../core/Context';
import type { XrplResponse } from '../../core/Provider';
import type { IHandler } from '../IHandler';
export declare const RequestMethod = "xrpl_request";
export declare class RequestHandler implements IHandler<typeof RequestMethod> {
    protected readonly context: Context;
    constructor(context: Context);
    handle<Request extends XrplRequest>(_: string, params: Request): Promise<XrplResponse<Request>>;
}
