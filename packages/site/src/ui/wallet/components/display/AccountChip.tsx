import { BlockchainAddress, Chip, ChipProps } from '@peersyst/react-components';
import clsx from 'clsx';

export interface AccountChipProps extends Omit<ChipProps, 'label'> {
  className?: string;
  style?: React.CSSProperties;
  address: string;
}

function AccountChip({ className, address, ...rest }: AccountChipProps) {
  return (
    <Chip
      label={
        <BlockchainAddress
          address={address}
          variant="caption"
          type="account"
          action="copy"
          showCopyIcon
          length={5}
        />
      }
      className={clsx('', className)}
      {...rest}
    />
  );
}

export default AccountChip;
