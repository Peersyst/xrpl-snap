import type { Request as XrplRequest } from 'xrpl';

import type { Context } from '../../core/Context';
import type { XrplResponse } from '../../core/Provider';
import type { IHandler } from '../IHandler';

export const RequestMethod = 'xrpl_request';

export class RequestHandler implements IHandler<typeof RequestMethod> {
  constructor(protected readonly context: Context) {}

  async handle<Request extends XrplRequest>(_: string, params: Request): Promise<XrplResponse<Request>> {
    return this.context.provider.request(params);
  }
}
