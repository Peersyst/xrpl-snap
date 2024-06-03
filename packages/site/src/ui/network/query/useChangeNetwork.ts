import { useMutation } from '@tanstack/react-query';
import ControllerFactory from '../../adapter/ControllerFactory';
import { Network } from 'common/models/network/network.types';

export default function useChangeNetwork() {
  return useMutation({
    mutationFn: async (network: Network) =>
      ControllerFactory.networkController.changeNetwork(network),
  });
}
