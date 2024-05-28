import type { Request as XrplRequest } from 'xrpl';

import type { Context } from '../../core/Context';
import type { XrplResponse } from '../../core/Provider';
import type { IHandler } from '../IHandler';

export const RequestName = 'xrpl_request';
export type RequestMethod = typeof RequestName;
export type RequestParams = XrplRequest;

export class RequestHandler implements IHandler<RequestParams> {
  constructor(protected readonly context: Context) {}

  async handle<Request extends XrplRequest>(
    _: string,
    params: Request,
  ): Promise<XrplResponse<Request> & any> {
    return this.context.provider.request(params);
  }
}
