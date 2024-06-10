import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutationOptions } from 'ui/query/react-query-overrides';

import ControllerFactory from '../../adapter/ControllerFactory';

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
