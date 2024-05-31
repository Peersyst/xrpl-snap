import type { Context } from '../../core/Context';
import { MessageDialog } from '../../dialog/message/MessageDialog';
import type { IHandler } from '../IHandler';

export const SignMessageMethod = 'xrpl_signMessage';

export class SignMessageHandler implements IHandler<typeof SignMessageMethod> {
  constructor(protected readonly context: Context) {}

  async handle(
    origin: string,
    params: { message: string },
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
