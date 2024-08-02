import { BlockchainAddress } from '@peersyst/react-components';
import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';

export interface BlockchainAddressInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  account: string;
  label: string;
}

function BlockchainAddressInfoDisplay({ className, account, label, ...rest }: BlockchainAddressInfoDisplayProps) {
  return (
    <InfoDisplay
      className={clsx('BlockchainAddressInfoDisplay', className)}
      title={label}
      content={<BlockchainAddress showCopyIcon address={account} type="mainnetAddress" variant="body1" fontWeight="500" />}
      {...rest}
    />
  );
}

export default BlockchainAddressInfoDisplay;
