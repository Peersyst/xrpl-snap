import { Fragment } from 'react';
import Button from 'ui/common/components/input/Button/Button';
import { useTranslate } from 'ui/locale';

import { useWalletConsoleState } from '../WalletConsole/WalletConsoleState';

export default function OpenConsoleButton() {
  const translate = useTranslate();
  const { setIsExpanded } = useWalletConsoleState();

  return (
    <Fragment>
      <Button onClick={() => setIsExpanded(true)} variant="secondary" fullWidth>
        {translate('openConsole')}
      </Button>
    </Fragment>
  );
}
