import { useMutation } from '@tanstack/react-query';
import ControllerFactory from '../../adapter/ControllerFactory';

export default function useInstallSnap() {
  return useMutation({
    mutationFn: async () => ControllerFactory.snapController.install(),
    onSuccess: async () =>
      ControllerFactory.snapController.recoverMetamaskState(),
  });
}
