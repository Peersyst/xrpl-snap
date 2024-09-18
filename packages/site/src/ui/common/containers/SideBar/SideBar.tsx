import clsx from 'clsx';
import AccountInfo from 'ui/wallet/containers/AccountInfo/AccountInfo';

import { SideBarRoot } from './SideBar.styles';
import SideBarTabs from './SideBarTabs/SideBarTabs';

export type SideBarProps = {
  className?: string;
  style?: React.CSSProperties;
};

function SideBar({ className, ...rest }: SideBarProps) {
  return (
    <SideBarRoot className={clsx('Sidebar', className)} {...rest}>
      <AccountInfo />
      <SideBarTabs />
    </SideBarRoot>
  );
}

export default SideBar;
