import type { Context } from '../../core/Context';
import { MessageDialog } from '../../dialog/message/MessageDialog';
import type { IHandler } from '../IHandler';

export const SignMessage = 'xrpl_signMessage';
export type SignMessageMethod = typeof SignMessage;
export type SignMessageParams = { message: string };

export class SignMessageHandler implements IHandler<SignMessageParams> {
  constructor(protected readonly context: Context) {}

  async handle(
    origin: string,
    params: SignMessageParams,
  ): Promise<{ signature: string }> {
    const success = await MessageDialog.prompt(origin, params.message);
    if (!success) {
      throw Error('User declined operation');
    }
    return {
      signature: this.context.wallet.signMessage(params.message),
    };
  }
}
