import { BalanceInfo } from 'common/models/balance/balance';
import Amount from 'common/utils/Amount';
import { DomainEvents } from 'domain/events';
import type NetworkController from 'domain/network/controller/NetworkController';
import { withMetaMaskRepositoryError } from 'domain/snap/errors/withMetaMaskError';
import { xrpToDrops } from 'xrpl';

import type { TokenWithBalance } from '../../../common/models/token';
import type { MetaMaskRepository } from '../../../data-access/repository/metamask/MetaMaskRepository';
import type State from '../../common/State';
import { DomainError } from '../../error/DomainError';
import type { IWalletState } from '../state/walletState';
import { WalletErrorCodes } from '../WalletErrorCodes';

export default class WalletController {
  constructor(
    public readonly walletState: State<IWalletState>,
    private readonly networkController: NetworkController,
    private readonly metamaskRepository: MetaMaskRepository,
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

    const xrpBalancePromise = this.getBalance().then(({ expendable: { decimals, amount } }) => ({
      balance: new Amount(amount, decimals, 'XRP'),
      currency: 'XRP',
      decimals,
      issuer: '',
    }));

    const [iouTokens, xrpBalance] = await Promise.all([iouTokensPromise, xrpBalancePromise]);

    return [xrpBalance, ...iouTokens];
  }

  async getBalance(): Promise<BalanceInfo> {
    const state = this.walletState.getState();
    if (!state.address) {
      throw new DomainError(WalletErrorCodes.WALLET_NOT_INITIALIZED);
    }

    const networkReserve = this.networkController.getNetworkReserve();

    let totalBalance = new Amount('0', 6, 'XRP');
    let reserveBalance = new Amount('0', 6, 'XRP');
    let expendableBalance = new Amount('0', 6, 'XRP');

    try {
      const { Balance, OwnerCount } = await this.metamaskRepository.getAccountInfo(state.address);

      // Set the available balance
      totalBalance = totalBalance.plus(Balance);

      // Set the default reserve balance
      reserveBalance = reserveBalance.plus(xrpToDrops(networkReserve.baseReserveCostInXrp));

      // For each OwnerCount, add the owner reserve cost
      let ownerReserveCost = new BigNumber(xrpToDrops(networkReserve.ownerReserveCostInXrpPerItem));
      ownerReserveCost = ownerReserveCost.times(Number(OwnerCount));

      reserveBalance = reserveBalance.plus(ownerReserveCost.toString());

      // Finally calculate the available balance
      expendableBalance = totalBalance.minus(reserveBalance);

      if (expendableBalance.lt('0')) {
        expendableBalance.amount = '0';
      }
    } catch (e) {}

    return {
      expendable: expendableBalance,
      reserve: reserveBalance,
      total: totalBalance,
    };
  }

  async exportPrivateKey(): Promise<void> {
    await withMetaMaskRepositoryError(async () => {
      await this.metamaskRepository.exportPrivateKey();
    });
  }
}
