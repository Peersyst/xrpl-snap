import { useMutation } from 'react-query';

import ControllerFactory from '../../adapter/ControllerFactory';

export default function useInstallSnap() {
  return useMutation(async () => ControllerFactory.snapController.install(), {
    onSuccess: async () =>
      ControllerFactory.snapController.recoverMetamaskState(),
  });
}
