import { useAppSelector } from "hooks/redux";
import { FC, useEffect, useRef } from "react";
import { useStarkNetSnap } from "services";
import { Transaction } from "types";
import { TRANSACTIONS_REFRESH_FREQUENCY } from "utils/constants";
import { IListProps } from "../List/List.view";
import { TransactionListItem } from "./TransactionListItem";
import { Wrapper } from "./TransactionsList.style";

interface Props {
    transactions: Transaction[];
}

export const TransactionsListView = ({ transactions }: Props) => {
    const { getTransactions } = useStarkNetSnap();
    const networks = useAppSelector((state) => state.networks);
    const wallet = useAppSelector((state) => state.wallet);
    const timeoutHandle = useRef(setTimeout(() => undefined));

    useEffect(() => {
        const chain = networks.items[networks.activeNetwork]?.chainId;
        const address = wallet.accounts?.[0] as unknown as string;
        if (chain && address) {
            clearTimeout(timeoutHandle.current); // cancel the timeout that was in-flight
            timeoutHandle.current = setTimeout(
                () => getTransactions(address, wallet.erc20TokenBalanceSelected.address, 10, 10, chain, false, true),
                TRANSACTIONS_REFRESH_FREQUENCY,
            );
            return () => clearTimeout(timeoutHandle.current);
        }
    }, [wallet.transactions]);

    useEffect(() => {
        const chain = networks.items[networks.activeNetwork]?.chainId;
        const address = wallet.accounts?.[0] as unknown as string;
        if (chain && address) {
            clearTimeout(timeoutHandle.current); // cancel the timeout that was in-flight
            getTransactions(address, wallet.erc20TokenBalanceSelected.address, 10, 10, chain);
        }
    }, [wallet.erc20TokenBalanceSelected.address, wallet.erc20TokenBalanceSelected.chainId, wallet.accounts?.[0]]);

    return (
        <Wrapper<FC<IListProps<Transaction>>>
            data={transactions.length > 0 ? transactions : wallet.transactions}
            render={(transaction) => <TransactionListItem transaction={transaction} />}
            keyExtractor={(transaction) => transaction.txnHash.toString()}
        />
    );
};
