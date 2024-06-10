import { xrpToDrops, type Payment, ResponseOnlyTxInfo } from "xrpl";
import type { MetamaskRepository } from "../../../data-access/repository/metamask/MetamaskRepository";
import { SendParams } from "common/models/transaction/send.types";
import { polling } from "@peersyst/react-utils";
import { DomainEvents } from "domain/events";
import Amount from "common/utils/Amount";
import { DomainError } from "domain/error/DomainError";
import { TransactionErrorCodes } from "../error/TransactionErrorCodes";

export type TransactionsWithMarker = {
    transactions: (Payment & ResponseOnlyTxInfo)[];
    marker: unknown;
};

export default class TransactionController {
    constructor(private readonly metamaskRepository: MetamaskRepository) {}

    async getAccountTransactions(address: string, marker: unknown): Promise<TransactionsWithMarker> {
        const res = await this.metamaskRepository.getAccountTransactions(address, marker);
        return {
            marker: res.result.marker,
            transactions: res.result.transactions
                .map((accountTx) => accountTx.tx)
                .filter((tx) => tx?.TransactionType === "Payment") as (Payment & ResponseOnlyTxInfo)[],
        };
    }

    /**
     * Checks if a transaction is validated
     * @param hash Hash of the transaction
     */
    public async isTransactionValidated(hash: string): Promise<boolean> {
        const tx = await this.metamaskRepository.getTransaction(hash);
        const result = tx.result;
        if ("validated" in result) {
            return !!result.validated;
        } else {
            return false;
        }
    }

    /**
     * Await for a transaction to be validated
     * @param hash Hash of the transaction
     */
    public async awaitTransactionValidation(hash: string): Promise<void> {
        await polling(
            () => this.isTransactionValidated(hash),
            (res) => !res,
            {
                maxIterations: 15,
                delay: 2000,
            },
        );
    }

    async sendXrpTransaction(params: SendParams): Promise<string> {
        const availableAmount: Amount = params.token.balance;

        if (!availableAmount.canPay(params.amount)) {
            throw new DomainError(TransactionErrorCodes.INSUCCICIENT_BALANCE);
        }

        return await this.metamaskRepository.send({
            ...params,
            amount: xrpToDrops(params.amount),
        });
    }

    async sendIOUTransaction({ amount, destination, token }: SendParams): Promise<string> {
        const availableAmount: Amount = token.balance;

        if (!availableAmount.canPay(amount)) {
            throw new DomainError(TransactionErrorCodes.INSUCCICIENT_BALANCE);
        }

        return await this.metamaskRepository.send({
            destination,
            amount: {
                currency: token.currency,
                value: amount,
                issuer: token.issuer,
            },
        });
    }

    async sendTransaction(params: SendParams): Promise<string> {
        const token = params.token;
        let hash = "";

        if (token.currency === "XRP") {
            hash = await this.sendXrpTransaction(params);
        } else {
            hash = await this.sendIOUTransaction(params);
        }

        DomainEvents.transaction.emit("onTransactionSigned");
        await this.awaitTransactionValidation(hash);

        return hash;
    }
}
