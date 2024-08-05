import clsx from 'clsx';
import { ACCOUNT_FLAGS } from 'common/utils/xrpl/flags';
import { useTranslate } from 'ui/locale';

import SimpleTextInfoDisplay from '../SimpleTextInfoDisplay/SimpleTextInfoDisplay';

export interface AccountSetFlagInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  flag: number;
  type: 'set' | 'clear';
}

function AccountSetFlagInfoDisplay({ className, flag, type, ...rest }: AccountSetFlagInfoDisplayProps) {
  const translate = useTranslate('transactions');
  const translateFlags = useTranslate('transactionFlags');
  const knownFlag = ACCOUNT_FLAGS[flag];

  return (
    <SimpleTextInfoDisplay
      className={clsx('AccountSetFlagInfoDisplay', className)}
      label={translate(type === 'set' ? 'setFlag' : 'clearFlag')}
      content={knownFlag ? `${knownFlag}: ${translateFlags(knownFlag)}` : String(flag)}
      {...rest}
    />
  );
}

export default AccountSetFlagInfoDisplay;
