import { BlockchainAddress, Typography } from '@peersyst/react-components';
import { useTranslate } from 'ui/locale';

import { RegularKeyInfoDisplayProps } from './RegularKeyInfoDisplay';

function RegularKeyInfoDisplayContent({ regularKey }: Pick<RegularKeyInfoDisplayProps, 'regularKey'>) {
  const translate = useTranslate('transactions');
  if (!regularKey) {
    return (
      <Typography variant="body1" fontWeight="500">
        {translate('emptyRegularKey')}
      </Typography>
    );
  }
  return <BlockchainAddress address={regularKey} type="mainnetAddress" variant="body1" fontWeight="500" />;
}

export default RegularKeyInfoDisplayContent;
