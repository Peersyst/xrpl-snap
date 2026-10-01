import { InvalidParamsError, UserRejectedRequestError } from '@metamask/snaps-sdk';
import { validate, ValidationError, type SubmittableTransaction } from 'xrpl';

import type { Context } from '../../core/Context';
import { TransactionDialog } from '../../dialog/transaction/TransactionDialog';
import type { IHandler } from '../IHandler';

export const SignForMethod = 'xrpl_signFor';

/**
 * Sign a transaction as one signer of a multi-signing account (the
 * equivalent of rippled's `sign_for`).
 *
 * The transaction must be fully prepared by the caller (`Fee`, `Sequence` or
 * `TicketSequence`, and `SigningPubKey: ""`). It is never autofilled: every
 * signer of a multisigned transaction has to sign exactly the same fields, so
 * the snap must not change any of them.
 *
 * Returns a `tx_blob` with a single `Signers` entry for the snap's account,
 * to be combined with the other signers' contributions by the caller.
 */
export class SignForHandler implements IHandler<typeof SignForMethod> {
  constructor(protected readonly context: Context) {}

  async handle(
    origin: string,
    params: SubmittableTransaction,
    // eslint-disable-next-line @typescript-eslint/naming-convention
  ): Promise<{ tx_blob: string; hash: string }> {
    const signer = this.context.wallet.address;

    if (params.Account === signer) {
      throw new InvalidParamsError('Cannot sign for your own account: an account cannot be one of its own signers');
    }
    if (params.SigningPubKey !== undefined && params.SigningPubKey !== '') {
      throw new InvalidParamsError('SigningPubKey must be an empty string for multisigning');
    }
    if (params.TxnSignature !== undefined || params.Signers !== undefined) {
      throw new InvalidParamsError('Transaction must not contain TxnSignature or Signers');
    }
    if (params.Fee === undefined || params.Sequence === undefined) {
      throw new InvalidParamsError('Transaction must be fully prepared (Fee and Sequence) before multisigning');
    }

    const transaction = { ...params, SigningPubKey: '' };

    try {
      validate(transaction as unknown as Record<string, unknown>);
    } catch (error: unknown) {
      let message = 'Invalid transaction';
      if (error instanceof ValidationError) {
        message = error.message;
      }
      throw new InvalidParamsError(message);
    }

    const success = await TransactionDialog.prompt(origin, transaction, { signingFor: transaction.Account });
    if (!success) {
      throw new UserRejectedRequestError();
    }
    return this.context.wallet.sign(transaction, true);
  }
}
