import { useMutation, useQueryClient } from "@tanstack/react-query";
import ControllerFactory from "../../adapter/ControllerFactory";
import { MutationOptions } from "ui/query/react-query-overrides";

export default function useDisconnect({ onSuccess, ...options }: MutationOptions = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        ...options,
        mutationFn: async () => ControllerFactory.snapController.disconnect(),
        onSuccess: (...args) => {
            queryClient.removeQueries();
            onSuccess?.(...args);
        },
    });
}
