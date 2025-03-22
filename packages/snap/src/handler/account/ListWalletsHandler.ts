import type { Context } from '../../core/Context';
import type { IHandler } from '../IHandler';

export const ListWalletsMethod = 'xrpl_listWallets';

export interface WalletInfo {
  address: string;
  publicKey: string;
  type: 'derived' | 'imported';
  isActive: boolean;
}

export class ListWalletsHandler implements IHandler<typeof ListWalletsMethod> {
  constructor(protected readonly context: Context) {}

  async handle(): Promise<{ wallets: WalletInfo[] }> {
    const state = await this.context.stateManager.get();
    
    // Get the derived wallet info - use the base derived wallet address
    const derivedWallet: WalletInfo = {
      address: this.context.derivedWallet.address,
      publicKey: this.context.derivedWallet.publicKey,
      type: 'derived',
      isActive: !state.activeImportedWallet, // Active if no imported wallet is selected
    };

    // Ensure the derived wallet address is stored in state for future rehydration
    if (!state.derivedWalletAddress || state.derivedWalletAddress !== derivedWallet.address) {
      await this.context.stateManager.set({ derivedWalletAddress: derivedWallet.address });
    }

    // Get imported wallets info
    const importedWallets: WalletInfo[] = state.importedWallets.map((w) => ({
      address: w.address,
      publicKey: w.publicKey,
      type: 'imported',
      isActive: state.activeImportedWallet === w.address,
    }));

    return {
      wallets: [derivedWallet, ...importedWallets],
    };
  }
} 