import { Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { ACCOUNT_FLAGS } from 'common/utils/xrpl/flags';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

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
    <InfoDisplay
      className={clsx('AccountSetFlagInfoDisplay', className)}
      title={translate(type === 'set' ? 'setFlag' : 'clearFlag')}
      content={
        <Typography variant="body1" fontWeight="500">
          {knownFlag ? `${knownFlag}: ${translateFlags(knownFlag)}` : flag}
        </Typography>
      }
      {...rest}
    />
  );
}

export default AccountSetFlagInfoDisplay;
