import { useMutation } from '@tanstack/react-query';

import ControllerFactory from '../../adapter/ControllerFactory';

export default function useExportFamilySeed() {
  return useMutation({
    mutationFn: async () => ControllerFactory.walletController.exportFamilySeed(),
  });
}
