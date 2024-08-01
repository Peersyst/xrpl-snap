import { BlockchainAddress, Typography } from '@peersyst/react-components';
import { useTranslate } from 'ui/locale';

import { NFTokenMinterInfoDisplayProps } from './NFTokenMinterInfoDisplay';

function NFTokenMinterInfoDisplayContent({ nftTokenMinter }: Pick<NFTokenMinterInfoDisplayProps, 'nftTokenMinter'>) {
  const translate = useTranslate('transactions');
  if (nftTokenMinter === '') {
    return (
      <Typography variant="body1" fontWeight="500">
        {translate('removeNftTokenMinter')}
      </Typography>
    );
  }
  return <BlockchainAddress address={nftTokenMinter} type="mainnetAddress" variant="body1" fontWeight="500" />;
}

export default NFTokenMinterInfoDisplayContent;
