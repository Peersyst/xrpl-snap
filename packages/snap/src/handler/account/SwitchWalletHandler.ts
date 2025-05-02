import { InvalidParamsError } from '@metamask/snaps-sdk';
import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';
import { NodeType } from '@metamask/snaps-sdk';

export const SwitchWalletMethod = 'xrpl_switchWallet';

export class SwitchWalletHandler implements IHandler<typeof SwitchWalletMethod> {
  constructor(protected readonly context: Context) {}

  async handle(origin: string, params: { address: string }): Promise<{ address: string }> {
    const state = await this.context.stateManager.get();

    // Show confirmation dialog
    const confirmed = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: {
          type: NodeType.Panel,
          children: [
            {
              type: NodeType.Text,
              value: 'Are you sure you want to switch to this wallet?',
            },
            {
              type: NodeType.Text,
              value: `Address: ${params.address}`,
            },
          ],
        },
      },
    });

    if (!confirmed) {
      throw new Error('Wallet switch cancelled by user');
    }

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