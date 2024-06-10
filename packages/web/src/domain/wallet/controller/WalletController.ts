import Amount from "common/utils/Amount";
import type { TokenWithBalance } from "../../../common/models/token";
import type { MetamaskRepository } from "../../../data-access/repository/metamask/MetamaskRepository";
import type State from "../../common/State";
import { DomainError } from "../../error/DomainError";
import type { IWalletState } from "../state/walletState";
import { WalletErrorCodes } from "../WalletErrorCodes";
import { DomainEvents } from "domain/events";
import { withMetamaskRepositoryError } from "domain/snap/errors/withMetamaskError";
import NetworkController from "domain/network/controller/NetworkController";
import { xrpToDrops } from "xrpl";

export default class WalletController {
    constructor(
        public readonly walletState: State<IWalletState>,
        private readonly networkController: NetworkController,
        private readonly metamaskRepository: MetamaskRepository,
    ) {}

    onInit(): void {
        DomainEvents.snap.on("onSpanInitialized", () => {
            this.loadWallet().catch((error) => {
                // eslint-disable-next-line no-console
                console.error(error);
            });
        });

        DomainEvents.snap.on("onSnapDisconnected", () => {
            this.walletState.setState({
                address: undefined,
            });
        });

        DomainEvents.network.on("onNetworkChanged", () => {
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
            balance: new Amount(amount, decimals, "XRP"),
            currency: "XRP",
            decimals,
            issuer: "",
        }));

        const [iouTokens, xrpBalance] = await Promise.all([iouTokensPromise, xrpBalancePromise]);

        return [xrpBalance, ...iouTokens];
    }

    async getBalance(): Promise<Amount> {
        const state = this.walletState.getState();
        if (!state.address) {
            throw new DomainError(WalletErrorCodes.WALLET_NOT_INITIALIZED);
        }

        const networkResereve = this.networkController.getNetworkReserve();

        let xrpBalance = new Amount("0", 6, "XRP");
        try {
            const { Balance, OwnerCount } = await this.metamaskRepository.getAccountInfo(state.address);

            //Set the available balance
            xrpBalance = xrpBalance.plus(Balance);

            //Subtract the network reserve cost
            xrpBalance = xrpBalance.minus(xrpToDrops(networkResereve.baseReserveCostInXrp).toString());

            //For each OwnerCount, subtract the owner reserve cost
            const ownerReserveCost = new BigNumber(xrpToDrops(networkResereve.ownerReserveCostInXrpPerItem));
            ownerReserveCost.times(Number(OwnerCount));
            xrpBalance = xrpBalance.minus(ownerReserveCost.toString());
        } catch (e) {}
        return xrpBalance;
    }

    async exportPrivateKey(): Promise<void> {
        await withMetamaskRepositoryError(async () => {
            await this.metamaskRepository.exportPrivateKey();
        });
    }
}
