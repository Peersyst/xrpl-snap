import { config } from '../../../common/config';
import type { TokenWithBalance } from '../../../common/models/token';
import type { MetamaskRepository } from '../../../data_access/repository/metamask/MetamaskRepository';
import type State from '../../common/State';
import DomainError from '../../error/DomainError';
import type { IWalletState } from '../state/walletState';
import { WalletErrorCodes } from '../WalletErrorCodes';

export default class WalletController {
  constructor(
    public readonly walletState: State<IWalletState>,
    private readonly metamaskRepository: MetamaskRepository,
  ) {}

  async onInit(): Promise<void> {
    await this.loadWallet();
  }

  async loadWallet() {
    if (!this.metamaskRepository.provider) {
      return this.walletState.setState({});
    }
    const wallet = await this.metamaskRepository.getWallet();
    console.log(wallet);
    return this.walletState.setState({ address: wallet.account });
  }

  async getTokens(): Promise<TokenWithBalance[]> {
    const state = this.walletState.getState();
    if (!state.address) {
      throw new DomainError(WalletErrorCodes.WALLET_NOT_INITIALIZED);
    }
    return this.metamaskRepository.getTokens(state.address);
  }
}
