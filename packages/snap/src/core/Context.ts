import { Provider } from './Provider';
import { StateManager } from './StateManager';
import { Wallet } from './Wallet';
import { EncryptionManager } from './utils/encryption';

export class Context {
  private _wallet: Wallet;
  private _activeImportedWallet?: Wallet;

  constructor(
    public readonly stateManager: StateManager,
    public readonly provider: Provider,
    derivedWallet: Wallet
  ) {
    this._wallet = derivedWallet;
  }

  get wallet(): Wallet {
    // Return the active imported wallet if it exists, otherwise return the derived wallet
    return this._activeImportedWallet || this._wallet;
  }

  get derivedWallet(): Wallet {
    // Always return the derived wallet
    return this._wallet;
  }

  static async init(): Promise<Context> {
    const stateManager = new StateManager();
    const state = await stateManager.get();
    const provider = new Provider(state.activeNetwork.nodeUrl);
    const derivedWallet = await Wallet.derive();

    const context = new Context(stateManager, provider, derivedWallet);

    // If there's an active imported wallet, initialize it
    if (state.activeImportedWallet) {
      const importedWallet = state.importedWallets.find(
        (w) => w.address === state.activeImportedWallet
      );
      if (importedWallet) {
        try {
          console.log('Initializing active imported wallet...');
          const decryptedSeed = await EncryptionManager.decryptData(
            importedWallet.encryptedSeed
          );
          context._activeImportedWallet = Wallet.fromSeed(decryptedSeed);
          console.log('Successfully initialized imported wallet');
        } catch (error) {
          console.error('Failed to initialize imported wallet:', error);
          // Don't throw, just log the error and continue without the imported wallet
        }
      }
    }

    return context;
  }

  async updateActiveWallet(address?: string): Promise<void> {
    if (!address) {
      // Switch to derived wallet
      this._activeImportedWallet = undefined;
      return;
    }

    try {
      const state = await this.stateManager.get();
      const importedWallet = state.importedWallets.find((w) => w.address === address);
      if (!importedWallet) {
        throw new Error(`Wallet not found for address: ${address}`);
      }

      console.log('Found imported wallet, attempting to decrypt seed...');
      const decryptedSeed = await EncryptionManager.decryptData(
        importedWallet.encryptedSeed
      );
      
      if (!decryptedSeed) {
        throw new Error('Failed to decrypt seed');
      }

      console.log('Successfully decrypted seed, creating wallet...');
      // Create wallet from the decrypted seed
      const newWallet = Wallet.fromSeed(decryptedSeed);

      // Verify that the created wallet matches the expected address
      if (newWallet.address !== address) {
        throw new Error(`Address mismatch: expected ${address}, got ${newWallet.address}`);
      }

      console.log('Successfully created and verified wallet');
      this._activeImportedWallet = newWallet;
    } catch (error) {
      console.error('Failed to update active wallet:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to activate wallet: ${error.message}`);
      } else {
        throw new Error('Failed to activate wallet: Unknown error');
      }
    }
  }
}
