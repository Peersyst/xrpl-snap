import type { ChipProps } from '@peersyst/react-components';
import { BlockchainAddress, Chip } from '@peersyst/react-components';
import clsx from 'clsx';

export type AccountChipProps = {
  className?: string;
  style?: React.CSSProperties;
  address: string;
} & Omit<ChipProps, 'label'>;

function AccountChip({ className, address, variant = 'outlined', ...rest }: AccountChipProps) {
  return (
    <Chip
      label={
        <BlockchainAddress
          address={address}
          variant="caption"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore TODO: fix this
          type="account"
          action="copy"
          showCopyIcon
          length={5}
          light={variant === 'filled'}
        />
      }
      className={clsx('', className)}
      variant={variant}
      {...rest}
    />
  );
}

export default AccountChip;
