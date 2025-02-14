import { InvalidParamsError, UserRejectedRequestError } from '@metamask/snaps-sdk';

import type { Context } from '../../core/Context';
import { Wallet } from '../../core/Wallet';
import { ImportWalletDialog } from '../../dialog/account/ImportWalletDialog';
import type { IHandler } from '../IHandler';
import { EncryptionManager } from '../../core/utils/encryption';

export const ImportWalletMethod = 'xrpl_importWallet';

export class ImportWalletHandler implements IHandler<typeof ImportWalletMethod> {
  constructor(protected readonly context: Context) {}

  async handle(origin: string, params: { privateKey?: string; seed?: string }): Promise<{ address: string }> {
    if (!params.seed && !params.privateKey) {
      throw new InvalidParamsError('Family seed must be provided');
    }

    // Convert privateKey parameter to seed if provided
    const seed = params.seed || params.privateKey;
    if (!seed) {
      throw new InvalidParamsError('Family seed must be provided');
    }

    // Ensure seed starts with 's'
    const formattedSeed = seed.startsWith('s') ? seed : `s${seed}`;

    let wallet: Wallet;
    try {
      console.log('Creating wallet from seed...');
      wallet = Wallet.fromSeed(formattedSeed);
    } catch (error) {
      console.error('Failed to create wallet:', error);
      throw new InvalidParamsError('Invalid family seed format');
    }

    // Get user confirmation
    const confirmed = await ImportWalletDialog.prompt(origin, wallet.address);
    if (!confirmed) {
      throw new UserRejectedRequestError();
    }

    // Get current state and check if wallet already exists
    const state = await this.context.stateManager.get();
    const walletExists = state.importedWallets.some((w) => w.address === wallet.address);
    if (walletExists) {
      throw new InvalidParamsError('Wallet already imported');
    }

    // Encrypt the seed before storing
    console.log('Encrypting seed for storage...');
    const encryptedSeed = await EncryptionManager.encryptData(formattedSeed);

    // Add the new wallet to state
    await this.context.stateManager.set({
      importedWallets: [
        ...state.importedWallets,
        {
          address: wallet.address,
          publicKey: wallet.publicKey,
          encryptedSeed,
        },
      ],
    });

    return { address: wallet.address };
  }
} 