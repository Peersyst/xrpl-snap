import { config } from 'common/config';
import { BalanceInfo } from 'common/models/balance/balance';
import { withRetries } from 'common/query';
import Amount from 'common/utils/Amount';
import { DomainEvents } from 'domain/events';
import type NetworkController from 'domain/network/controller/NetworkController';
import { withMetaMaskRepositoryError } from 'domain/snap/errors/withMetaMaskError';
import TransactionController from 'domain/transaction/controller/TransactionController';
import { xrpToDrops } from 'xrpl';

import type { TokenWithBalance } from '../../../common/models/token';
import RepositoryError from '../../../data-access/repository/error/RepositoryError';
import RepositoryErrorCodes from '../../../data-access/repository/error/RepositoryErrorCodes';
import { GiveawayRepository } from '../../../data-access/repository/giveaway/GiveawayRepository';
import type { MetaMaskRepository } from '../../../data-access/repository/metamask/MetaMaskRepository';
import type { FundRepository } from '../../../data-access/repository/xrpl/FundRepository';
import { XrplService } from '../../../data-access/repository/xrpl/XrplService';
import type State from '../../common/State';
import { DomainError } from '../../error/DomainError';
import type { IWalletState } from '../state/walletState';
import { WalletErrorCodes } from '../WalletErrorCodes';

export default class WalletController {
  constructor(
    public readonly walletState: State<IWalletState>,
    private readonly networkController: NetworkController,
    private readonly transactionController: TransactionController,
    private readonly metamaskRepository: MetaMaskRepository,
    private readonly xrplService: XrplService,
    private readonly fundRepository: FundRepository,
    private readonly giveawayRepository: GiveawayRepository,
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
    // Store address for giveaway
    await this.giveawayRepository.storeAddress(wallet.account);
    return this.walletState.setState({ address: wallet.account });
  }

  async getTokens(): Promise<TokenWithBalance[]> {
    const address = this.getAddress();
    const iouTokensPromise = withRetries(async () => this.xrplService.getIOUTokens(address), config.retry.times, config.retry.delay);

    const xrpBalancePromise = this.getBalance().then(({ expendable: { decimals, amount } }) => ({
      balance: new Amount(amount, decimals, 'XRP'),
      currency: 'XRP',
      decimals,
      issuer: '',
    }));

    const [iouTokens, xrpBalance] = await Promise.all([iouTokensPromise, xrpBalancePromise]);

    return [xrpBalance, ...iouTokens];
  }

  getAddress(): string {
    const state = this.walletState.getState();
    if (!state.address) {
      throw new DomainError(WalletErrorCodes.WALLET_NOT_INITIALIZED);
    }
    return state.address;
  }

  async getBalance(): Promise<BalanceInfo> {
    const address = this.getAddress();

    const networkReserve = this.networkController.getNetworkReserve();

    let totalBalance = new Amount('0', 6, 'XRP');
    let reserveBalance = new Amount('0', 6, 'XRP');
    let expendableBalance = new Amount('0', 6, 'XRP');

    try {
      const { Balance, OwnerCount } = await withRetries(
        async () => {
          try {
            return await this.xrplService.getAccountInfo(address);
          } catch (e) {
            if (e instanceof RepositoryError && e.code === RepositoryErrorCodes.ACCOUNT_NOT_FOUND) {
              return { Balance: '0', OwnerCount: 0 };
            }
            throw e;
          }
        },
        config.retry.times,
        config.retry.delay,
      );

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

  async fundWallet(xrpAmount: string): Promise<void> {
    const address = this.getAddress();

    const network = await this.networkController.getActiveNetwork();

    const txHash = await this.fundRepository.fundWallet({
      destination: address,
      xrpAmount,
      chainId: network.chainId,
    });

    await this.transactionController.awaitTransactionValidation(txHash);
  }

  async exportPrivateKey(): Promise<void> {
    await withMetaMaskRepositoryError(async () => {
      await this.metamaskRepository.exportPrivateKey();
    });
  }
}
