import clsx from 'clsx';
import TokenList from 'ui/token/containers/TokenList/TokenList';
import AccountInfo from 'ui/wallet/containers/AccountInfo/AccountInfo';

import { SideBarAccountContent, SideBarRoot } from './SideBar.styes';

export type SideBarProps = {
  className?: string;
  style?: React.CSSProperties;
};

function SideBar({ className, ...rest }: SideBarProps) {
  return (
    <SideBarRoot className={clsx('Sidebar', className)} {...rest}>
      <AccountInfo />
      <SideBarAccountContent>
        <TokenList />
      </SideBarAccountContent>
    </SideBarRoot>
  );
}

export default SideBar;
