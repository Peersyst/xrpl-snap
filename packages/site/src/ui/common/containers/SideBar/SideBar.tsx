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
import Token from '../../components/display/Token/Token';

export interface SideBarProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function SideBar({ className, children, ...rest }: SideBarProps) {
  const { spacing } = useTheme();
  const translate = useTranslate();
  return (
    <SideBarRoot>
      <SideBarAccountRoot gap={spacing[3]}>
        <Typography variant="h3">{translate('account')}</Typography>
        <Row gap={spacing[2]}>
          <Popover position="bottom">
            <Popover.Popper>Content</Popover.Popper>
            <Popover.Content>
              <Chip label="i" />
            </Popover.Content>
          </Popover>
          <AccountChip address="raQwCVAJVqjrVm1Nj5SFRcX8i22BhdC9WA" />
        </Row>
        {/* TokenList */}
      </SideBarAccountRoot>
      <SideBarAccountContent>
        <Token
          balance="0"
          token={{ currency: 'XRP', issuer: '', decimals: 0 }}
        />
        <Token
          balance="0"
          token={{ currency: 'USD', issuer: '', decimals: 0 }}
        />
        <Token
          balance="0"
          token={{ currency: 'XRPL Coins', issuer: '', decimals: 0 }}
        />
        <Token
          balance="0"
          token={{ currency: 'RIBBITS', issuer: '', decimals: 0 }}
        />
      </SideBarAccountContent>
    </SideBarRoot>
  );
}

export default SideBar;
