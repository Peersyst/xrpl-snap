import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import ControllerFactory from "ui/adapter/ControllerFactory";
import { Queries } from "ui/query/queries";
import type { TransactionsWithMarker } from "../../../domain/transaction/controller/TransactionController";
import useWalletState from "../../adapter/state/useWalletState";
import useGetActiveNetwork from "ui/network/query/useGetActiveNetwork";

export default function useGetTransactions() {
    const { address } = useWalletState();
    const { data: activeNetwork } = useGetActiveNetwork();

    return useInfiniteQuery<TransactionsWithMarker, unknown, InfiniteData<TransactionsWithMarker>>({
        queryKey: [Queries.GET_TRANSACTIONS, address, String(activeNetwork?.chainId)],
        initialPageParam: undefined,
        getNextPageParam: (res) => res.marker,
        enabled: Boolean(address),
        queryFn: async ({ pageParam }) => ControllerFactory.transactionController.getAccountTransactions(address!, pageParam),
    });
}
