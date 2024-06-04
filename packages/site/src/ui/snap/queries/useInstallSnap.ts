import { useMutation } from '@tanstack/react-query';
import ControllerFactory from '../../adapter/ControllerFactory';
import { useInvalidateQueries } from 'ui/query/hooks/useInvalidateQueries';
import { Queries } from 'ui/query/queries';
import { MutationOptions } from 'ui/query/react-query-overrides';

export default function useInstallSnap({
  onSuccess,
  ...options
}: MutationOptions = {}) {
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
