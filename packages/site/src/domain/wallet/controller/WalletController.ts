import Amount from 'common/utils/Amount';
import { DomainEvents } from 'domain/events';
import type NetworkController from 'domain/network/controller/NetworkController';
import { withMetamaskRepositoryError } from 'domain/snap/errors/withMetamaskError';
import { xrpToDrops } from 'xrpl';

import type { TokenWithBalance } from '../../../common/models/token';
import type { MetamaskRepository } from '../../../data-access/repository/metamask/MetamaskRepository';
import type State from '../../common/State';
import { DomainError } from '../../error/DomainError';
import type { IWalletState } from '../state/walletState';
import { WalletErrorCodes } from '../WalletErrorCodes';

export default class WalletController {
  constructor(
    public readonly walletState: State<IWalletState>,
    private readonly networkController: NetworkController,
    private readonly metamaskRepository: MetamaskRepository,
  ) {}

  onInit(): void {
    DomainEvents.snap.on('onSpanInitialized', () => {
      this.loadWallet().catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    });

    DomainEvents.snap.on('onSnapDisconnected', () => {
      this.walletState.setState({
        address: undefined,
      });
    });

    DomainEvents.network.on('onNetworkChanged', () => {
      this.loadWallet();
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
    const iouTokensPromise = this.metamaskRepository.getIOUTokens(state.address);

    const xrpBalancePromise = this.getBalance().then(({ decimals, amount }) => ({
      balance: new Amount(amount, decimals, 'XRP'),
      currency: 'XRP',
      decimals,
      issuer: '',
    }));

    const [iouTokens, xrpBalance] = await Promise.all([iouTokensPromise, xrpBalancePromise]);

    return [xrpBalance, ...iouTokens];
  }

  async getBalance(): Promise<Amount> {
    const state = this.walletState.getState();
    if (!state.address) {
      throw new DomainError(WalletErrorCodes.WALLET_NOT_INITIALIZED);
    }

    const networkReserve = this.networkController.getNetworkReserve();

    const defaultAmount = new Amount('0', 6, 'XRP');
    let dropsBalance = defaultAmount;
    try {
      const { Balance, OwnerCount } = await this.metamaskRepository.getAccountInfo(state.address);

      // Set the available balance
      dropsBalance = dropsBalance.plus(Balance);

      // Subtract the network reserve cost
      dropsBalance = dropsBalance.minus(xrpToDrops(networkReserve.baseReserveCostInXrp).toString());

      // For each OwnerCount, subtract the owner reserve cost
      let ownerReserveCost = new BigNumber(xrpToDrops(networkReserve.ownerReserveCostInXrpPerItem));
      ownerReserveCost = ownerReserveCost.times(Number(OwnerCount));
      dropsBalance = dropsBalance.minus(ownerReserveCost.toString());

      if (dropsBalance.lt('0')) {
        return defaultAmount;
      }
    } catch (e) {}
    return dropsBalance;
  }

  async exportPrivateKey(): Promise<void> {
    await withMetamaskRepositoryError(async () => {
      await this.metamaskRepository.exportPrivateKey();
    });
  }
}
