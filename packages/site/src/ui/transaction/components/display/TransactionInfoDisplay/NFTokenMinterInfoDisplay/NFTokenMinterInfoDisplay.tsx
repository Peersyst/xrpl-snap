import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';

import NFTokenMinterInfoDisplayContent from './NFTokenMinterInfoDisplayContent';

export interface NFTokenMinterInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  nftTokenMinter: string;
}

function NFTokenMinterInfoDisplay({ className, nftTokenMinter, ...rest }: NFTokenMinterInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return (
    <InfoDisplay
      className={clsx('BlockchainAddressInfoDisplay', className)}
      title={translate('nftTokenMinter')}
      content={<NFTokenMinterInfoDisplayContent nftTokenMinter={nftTokenMinter} />}
      {...rest}
    />
  );
}

export default NFTokenMinterInfoDisplay;
