import { UserRejectedRequestError } from '@metamask/snaps-sdk';

import type { Context } from '../../core/Context';
import { SignMessageDialog } from '../../dialog/transaction/SignMessageDialog';
import type { IHandler } from '../IHandler';

export const SignMessageMethod = 'xrpl_signMessage';

export class SignMessageHandler implements IHandler<typeof SignMessageMethod> {
  constructor(protected readonly context: Context) {}

  async handle(origin: string, params: { message: string }): Promise<{ signature: string }> {
    const success = await SignMessageDialog.prompt(origin, params.message);
    if (!success) {
      throw new UserRejectedRequestError();
    }
    return {
      signature: this.context.wallet.signMessage(params.message),
    };
  }
}
