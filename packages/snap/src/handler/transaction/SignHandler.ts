import { InvalidParamsError, UserRejectedRequestError } from '@metamask/snaps-sdk';
import { validate, ValidationError, type SubmittableTransaction } from 'xrpl';

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

    try {
      validate(autofilledTransaction as unknown as Record<string, unknown>);
    } catch (error: unknown) {
      let message = 'Invalid transaction';
      if (error instanceof ValidationError) {
        message = error.message;
      }
      throw new InvalidParamsError(message);
    }

    const success = await TransactionDialog.prompt(origin, autofilledTransaction);
    if (!success) {
      throw new UserRejectedRequestError();
    }
    return this.context.wallet.sign(autofilledTransaction);
  }
}
