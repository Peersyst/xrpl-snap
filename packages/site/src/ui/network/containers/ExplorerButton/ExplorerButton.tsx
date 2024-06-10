import type { BlockchainAddressProps } from '@peersyst/react-components';
import clsx from 'clsx';
import type { BlockchainAddressType } from 'common/models/network/network.types';
import Button from 'ui/common/components/input/Button/Button';
import type { ButtonProps } from 'ui/common/components/input/Button/Button.types';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import { useTranslate } from 'ui/locale';
import { useBlockchainAddressUrl } from 'ui/network/hooks/useBlockchainAddressUrl';

export type ExplorerButtonProps = {
  address: BlockchainAddressProps['address'];
  type: BlockchainAddressType;
} & Omit<ButtonProps, 'type' | 'children'>;

function ExplorerButton({ className, type, address, ...rest }: ExplorerButtonProps) {
  const translate = useTranslate();
  const url = useBlockchainAddressUrl(type, address);

  return (
    <ExternalLink className={clsx('ExplorerButton', className)} to={url}>
      <Button {...rest}>{translate('viewOnExplorer')}</Button>
    </ExternalLink>
  );
}

export default ExplorerButton;
