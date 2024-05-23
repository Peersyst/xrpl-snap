import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';

export const Submit = 'xrpl_submit';
export type SubmitMethod = typeof Submit;
export type SubmitParams = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  tx_blob: string;
};

export class SubmitHandler implements IHandler<SubmitParams> {
  constructor(protected readonly context: Context) {}

  // Todo: handle this any type
  async handle(_: string, params: SubmitParams): Promise<any> {
    return this.context.provider.request({
      command: 'submit',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      tx_blob: params.tx_blob,
    });
  }
}
