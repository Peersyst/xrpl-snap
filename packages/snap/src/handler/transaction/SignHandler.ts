import type { SubmittableTransaction } from 'xrpl';

import type { Context } from '../../core/Context';
import { TransactionDialog } from '../../dialog/transaction/TransactionDialog';
import type { IHandler } from '../IHandler';

export const SignMethod = 'xrpl_sign';

export class SignHandler implements IHandler<typeof SignMethod> {
  constructor(protected readonly context: Context) {}

  async handle(
    origin: string,
    params: SubmittableTransaction,
    // eslint-disable-next-line @typescript-eslint/naming-convention
  ): Promise<{ tx_blob: string; hash: string }> {
    const autofilledTransaction = await this.context.provider.autofill(params);
    const success = await TransactionDialog.prompt(
      origin,
      autofilledTransaction,
    );
    if (!success) {
      throw Error('User declined operation');
    }
    return this.context.wallet.sign(autofilledTransaction);
  }
}
