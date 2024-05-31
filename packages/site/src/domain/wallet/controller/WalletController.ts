import { config } from '../../../common/config';
import type { MetamaskRepository } from '../../../data_access/repository/metamask/MetamaskRepository';
import type State from '../../common/State';
import type { IWalletState } from '../state/walletState';
import { Token } from '../../../common/models/token';

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
    const wallet = await this.metamaskRepository.getWallet(config.snapOrigin);
    console.log(wallet);
    return this.walletState.setState({ address: wallet.account });
  }

  async getTokens(): Promise<Token[]> {
    this.metamaskRepository.getTokens(address);
  }
}
