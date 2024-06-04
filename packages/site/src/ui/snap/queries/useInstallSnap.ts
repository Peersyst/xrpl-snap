import { useMutation } from '@tanstack/react-query';
import ControllerFactory from '../../adapter/ControllerFactory';
import { useInvalidateQueries } from 'ui/query/hooks/useInvalidateQueries';
import { Queries } from 'ui/query/queries';

export default function useInstallSnap() {
  const invalidateQueries = useInvalidateQueries();
  return useMutation({
    mutationFn: async () => ControllerFactory.snapController.install(),
    onSuccess: () => {
      invalidateQueries({
        queryKey: [Queries.GET_ACTIVE_NETWORK],
      });
      invalidateQueries({
        queryKey: [Queries.GET_STORED_NETWORKS],
      });
    },
  });
}
