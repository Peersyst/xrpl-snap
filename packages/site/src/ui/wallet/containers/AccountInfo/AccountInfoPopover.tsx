import { Col, Popover } from '@peersyst/react-components';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import PopoverListItem from 'ui/common/components/display/Popover/PopoverListItem/PopoverListItem';
import ChipIconButton from 'ui/common/components/input/ChipIconButton/ChipIconButton';
import { InfoIcon, LinkIcon, QrIcon } from 'ui/common/icons';
import { useTranslate } from 'ui/locale';
import AccountInfoModal from '../AccountInfoModal/AccountInfoModal';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import useGetExplorerAddressLink from 'ui/wallet/hooks/useGetExplorerAddressLink';
import AccountDetailsModal from '../AccountDetailsModal/AccountDetailsModal';

export interface AccountInfoPopoverProps {
  className?: string;
  style?: React.CSSProperties;
}

function AccountInfoPopover({ className, ...rest }: AccountInfoPopoverProps) {
  const [openAccountDetails, setOpenAccountDetails] = useState(false);
  const translate = useTranslate();
  const addressExplorerLink = useGetExplorerAddressLink();

  return (
    <Fragment>
      <Popover
        position="bottom-start"
        offsetY={6}
        showOn="click"
        arrow={false}
        className={clsx('AccountInfoPopover', className)}
        {...rest}
      >
        <Popover.Popper>
          <Col>
            <PopoverListItem
              Icon={QrIcon}
              onClick={() => setOpenAccountDetails(true)}
              text={translate('accountDetails')}
            />
            <ExternalLink to={addressExplorerLink} css={{ color: 'unset' }}>
              <PopoverListItem
                Icon={LinkIcon}
                text={translate('viewOnExplorer')}
              />
            </ExternalLink>
          </Col>
        </Popover.Popper>
        <Popover.Content>
          <ChipIconButton Icon={InfoIcon} />
        </Popover.Content>
      </Popover>
      <AccountDetailsModal
        renderAtRoot
        open={openAccountDetails}
        onClose={() => setOpenAccountDetails(false)}
      />
    </Fragment>
  );
}

export default AccountInfoPopover;
