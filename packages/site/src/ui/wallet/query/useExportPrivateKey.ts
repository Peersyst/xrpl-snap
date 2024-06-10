import { useMutation } from '@tanstack/react-query';

import ControllerFactory from '../../adapter/ControllerFactory';

export default function useExportPrivateKey() {
  return useMutation({
    mutationFn: async () => ControllerFactory.walletController.exportPrivateKey(),
  });
}
