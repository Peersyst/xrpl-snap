import {
  Chip,
  Popover,
  Row,
  Typography,
  useTheme,
} from '@peersyst/react-components';
import {
  SideBarAccountContent,
  SideBarAccountRoot,
  SideBarRoot,
} from './SideBar.styes';
import { useTranslate } from '../../../locale';
import AccountChip from '../../../wallet/components/display/AccountChip';
import TokenList from 'ui/token/containers/TokenList/TokenList';
import clsx from 'clsx';
import { useStore } from 'zustand';
import walletState from '../../../../domain/wallet/state/walletState';

export interface SideBarProps {
  className?: string;
  style?: React.CSSProperties;
}

function SideBar({ className, ...rest }: SideBarProps) {
  const { spacing } = useTheme();
  const translate = useTranslate();
  const useWalletState = useStore(walletState);


  return (
    <SideBarRoot className={clsx('Sidebar', className)} {...rest}>
      <SideBarAccountRoot gap={spacing[3]}>
        <Typography variant="h3">{translate('account')}</Typography>
        <Row gap={spacing[2]}>
          <Popover position="bottom">
            <Popover.Popper>Content</Popover.Popper>
            <Popover.Content>
              <Chip label="i" />
            </Popover.Content>
          </Popover>
          <AccountChip address={useWalletState.address || "rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"} />
        </Row>
      </SideBarAccountRoot>
      <SideBarAccountContent>
        <TokenList />
      </SideBarAccountContent>
    </SideBarRoot>
  );
}

export default SideBar;
