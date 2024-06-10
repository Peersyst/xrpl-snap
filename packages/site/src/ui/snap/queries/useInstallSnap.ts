import { useMutation } from '@tanstack/react-query';
import { useInvalidateQueries } from 'ui/query/hooks/useInvalidateQueries';
import { Queries } from 'ui/query/queries';
import type { MutationOptions } from 'ui/query/react-query-overrides';

import ControllerFactory from '../../adapter/ControllerFactory';

export default function useInstallSnap({ onSuccess, ...options }: MutationOptions = {}) {
  const invalidateQueries = useInvalidateQueries();
  return useMutation({
    ...options,
    mutationFn: async () => ControllerFactory.snapController.install(),
    onSuccess: (...args) => {
      invalidateQueries({
        queryKey: [Queries.GET_ACTIVE_NETWORK],
      });
      invalidateQueries({
        queryKey: [Queries.GET_STORED_NETWORKS],
      });
      onSuccess?.(...args);
    },
  });
}
