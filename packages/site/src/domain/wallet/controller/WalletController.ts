import Amount from 'common/utils/Amount';
import type { TokenWithBalance } from '../../../common/models/token';
import type { MetamaskRepository } from '../../../data_access/repository/metamask/MetamaskRepository';
import type State from '../../common/State';
import DomainError from '../../error/DomainError';
import type { IWalletState } from '../state/walletState';
import { WalletErrorCodes } from '../WalletErrorCodes';
import { DomainEvents } from 'domain/events';

export default class WalletController {
  constructor(
    public readonly walletState: State<IWalletState>,
    private readonly metamaskRepository: MetamaskRepository,
  ) {}

  onInit(): void {
    DomainEvents.snap.on('onSpanInitialized', () => {
      this.loadWallet().catch((error) => {
        console.error(error);
      });
    });
  }

  async loadWallet() {
    if (!this.metamaskRepository.provider) {
      return this.walletState.setState({});
    }

    const wallet = await this.metamaskRepository.getWallet();
    return this.walletState.setState({ address: wallet.account });
  }

  async getTokens(): Promise<TokenWithBalance[]> {
    const state = this.walletState.getState();
    if (!state.address) {
      throw new DomainError(WalletErrorCodes.WALLET_NOT_INITIALIZED);
    }
    return this.metamaskRepository.getTokens(state.address);
  }

  async getBalance(): Promise<Amount> {
    const state = this.walletState.getState();
    if (!state.address) {
      throw new DomainError(WalletErrorCodes.WALLET_NOT_INITIALIZED);
    }
    const xrp = await this.metamaskRepository.getXrpBalance(state.address);
    return xrp?.balance || new Amount('0', 6, 'XRP');
  }

  async exportPrivateKey(): Promise<void> {
    await this.metamaskRepository.exportPrivateKey();
  }
}
