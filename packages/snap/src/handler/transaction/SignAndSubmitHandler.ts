import type { Json } from '@metamask/snaps-sdk';
import type { SubmittableTransaction } from 'xrpl';

import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';
import { SignHandler } from './SignHandler';
import { SubmitHandler } from './SubmitHandler';

export const SignAndSubmit = 'xrpl_signAndSubmit';
export type SignAndSubmitMethod = typeof SignAndSubmit;
export type SignAndSubmitParams = SubmittableTransaction;

export class SignAndSubmitHandler implements IHandler<SignAndSubmitParams> {
  constructor(protected readonly context: Context) {}

  async handle(origin: string, params: SignAndSubmitParams): Promise<Json> {
    const signHandler = new SignHandler(this.context);
    const signedTransaction = await signHandler.handle(origin, params);

    const submitHandler = new SubmitHandler(this.context);
    return submitHandler.handle(origin, signedTransaction);
  }
}
