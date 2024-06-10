import { useQuery } from "@tanstack/react-query";
import ControllerFactory from "ui/adapter/ControllerFactory";
import { Queries } from "ui/query/queries";
import type { QueryOptions, QueryResult } from "ui/query/react-query-overrides";
import useWalletState from "../../adapter/state/useWalletState";
import Amount from "common/utils/Amount";
import useGetActiveNetwork from "ui/network/query/useGetActiveNetwork";
import { useConfig } from "@peersyst/react-components";
import useSnapState from "ui/adapter/state/useSnapState";

export default function useGetBalance({
    enabled = true,
    refetchInterval,
    ...options
}: QueryOptions<Amount, unknown, Amount, (Queries | number | undefined | string | undefined)[]> = {}): QueryResult<Amount> {
    const { address } = useWalletState();
    const { data: network } = useGetActiveNetwork();
    const { isSnapInstalled } = useSnapState();
    const configRefetchIntervals = useConfig("refetchIntervals");

    return useQuery({
        refetchInterval: refetchInterval ?? configRefetchIntervals.balance,
        enabled: enabled && Boolean(address) && isSnapInstalled,
        queryKey: [Queries.GET_BALANCE, address, network?.chainId],
        queryFn: async () => ControllerFactory.walletController.getBalance(),
        ...options,
    });
}
