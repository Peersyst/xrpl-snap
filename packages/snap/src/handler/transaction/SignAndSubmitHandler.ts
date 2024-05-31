import type { SubmitRequest, SubmittableTransaction } from 'xrpl';

import type { Context } from '../../core/Context';
import type { XrplResponse } from '../../core/Provider';
import type { IHandler } from '../IHandler';
import { SignHandler } from './SignHandler';
import { SubmitHandler } from './SubmitHandler';

export const SignAndSubmitMethod = 'xrpl_signAndSubmit';

export class SignAndSubmitHandler
  implements IHandler<typeof SignAndSubmitMethod>
{
  constructor(protected readonly context: Context) {}

  async handle(
    origin: string,
    params: SubmittableTransaction,
  ): Promise<XrplResponse<SubmitRequest>> {
    const signHandler = new SignHandler(this.context);
    const signedTransaction = await signHandler.handle(origin, params);

    const submitHandler = new SubmitHandler(this.context);
    return submitHandler.handle(origin, signedTransaction);
  }
}
