import { Col, Popover } from '@peersyst/react-components';
import clsx from 'clsx';
import useSnapState from 'ui/adapter/state/useSnapState';
import Dot from 'ui/common/components/display/Dot/Dot';
import PopoverListItem from 'ui/common/components/display/Popover/PopoverListItem/PopoverListItem';
import { BurguerIcon, QrIcon } from 'ui/common/icons';
import { useTranslate } from 'ui/locale';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';

export interface BurguerDropdownProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function BurguerDropdown({
  className,
  children,
  ...rest
}: BurguerDropdownProps) {
  const { isSnapInstalled } = useSnapState();
  const translate = useTranslate();
  return (
    <Popover
      position="bottom-start"
      offsetY={6}
      showOn="click"
      arrow={false}
      className={clsx('BurguerDropdown', className)}
      {...rest}
    >
      <Popover.Popper>
        <Col>
          <PopoverListItem Icon={QrIcon} text={translate('accountDetails')} />
          <PopoverListItem Icon={QrIcon} text={translate('accountDetails')} />
          <PopoverListItem Icon={QrIcon} text={translate('accountDetails')} />
        </Col>
      </Popover.Popper>
      <Popover.Content>
        <Col css={{ position: 'relative', cursor: 'pointer' }}>
          <BurguerIcon />
          {isSnapInstalled && (
            <Dot
              css={{
                position: 'absolute',
                top: '-0.2rem',
                right: '-0.25rem',
                zIndex: 2,
              }}
            />
          )}
        </Col>
      </Popover.Content>
    </Popover>
  );
}

export default BurguerDropdown;
