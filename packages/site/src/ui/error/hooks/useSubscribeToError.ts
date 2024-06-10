import { useEffect } from 'react';

import UIErrorEvent from '../UIErrorEvent';

export type UseSubscribeToUIErrorParams = {
  handleUiError: (e: UIErrorEvent) => void;
};

export default ({ handleUiError }: UseSubscribeToUIErrorParams) => {
  useEffect(() => {
    UIErrorEvent.addListener(handleUiError);
    return () => {
      UIErrorEvent.removeListener(handleUiError);
    };
  }, []);
};
