import { useMutation } from "@tanstack/react-query";
import ControllerFactory from "../../adapter/ControllerFactory";
import { Network } from "common/models/network/network.types";
import { useInvalidateQueries } from "ui/query/hooks/useInvalidateQueries";
import { Queries } from "ui/query/queries";

export default function useChangeNetwork() {
    const invalidateQueries = useInvalidateQueries();

    return useMutation({
        mutationFn: async (network: Network) => ControllerFactory.networkController.changeNetwork(network),
        onSuccess: () => {
            invalidateQueries({
                queryKey: [Queries.GET_ACTIVE_NETWORK],
            });
        },
    });
}
