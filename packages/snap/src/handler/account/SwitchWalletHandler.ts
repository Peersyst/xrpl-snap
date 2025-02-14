import { InvalidParamsError } from '@metamask/snaps-sdk';
import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';

export const SwitchWalletMethod = 'xrpl_switchWallet';

export class SwitchWalletHandler implements IHandler<typeof SwitchWalletMethod> {
  constructor(protected readonly context: Context) {}

  async handle(origin: string, params: { address: string }): Promise<{ address: string }> {
    const state = await this.context.stateManager.get();

    // If switching to derived wallet
    if (params.address === this.context.derivedWallet.address) {
      // Update context
      await this.context.updateActiveWallet(undefined);
      // Update state
      await this.context.stateManager.set({
        activeImportedWallet: undefined,
      });
      return { address: params.address };
    }

    // Find the imported wallet
    const importedWallet = state.importedWallets.find((w) => w.address === params.address);
    if (!importedWallet) {
      throw new InvalidParamsError('Wallet not found');
    }

    // Update context
    await this.context.updateActiveWallet(params.address);
    // Update state
    await this.context.stateManager.set({
      activeImportedWallet: importedWallet.address,
    });

    return { address: importedWallet.address };
  }
} 