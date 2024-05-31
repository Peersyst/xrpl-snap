import type { SubmitRequest } from 'xrpl';

import type { Context } from '../../core/Context';
import type { XrplResponse } from '../../core/Provider';
import type { IHandler } from '../IHandler';

export const SubmitMethod = 'xrpl_submit';

export class SubmitHandler implements IHandler<typeof SubmitMethod> {
  constructor(protected readonly context: Context) {}

  async handle(
    _: string,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    params: { tx_blob: string },
  ): Promise<XrplResponse<SubmitRequest>> {
    return this.context.provider.request({
      command: 'submit',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      tx_blob: params.tx_blob,
    });
  }
}
