import { Tab, Tabs } from '@peersyst/react-components';
import clsx from 'clsx';
import { useRef } from 'react';
import NftList from 'ui/nft/containers/NftList/NftList';
import TokenList from 'ui/token/containers/TokenList/TokenList';

import { SideBarTabGroup, SideBarTabPanel } from './SideBarTabs.styles';

export interface SideBarTabsProps {
  className?: string;
  style?: React.CSSProperties;
}

function SideBarTabs({ className, ...rest }: SideBarTabsProps) {
  const tokenRef = useRef<HTMLDivElement>(null);
  const nftRef = useRef<HTMLDivElement>(null);
  return (
    <Tabs className={clsx('SideBarTabs', className)} {...rest}>
      <SideBarTabGroup>
        <Tab index={0}>Tokens</Tab>
        <Tab index={1}>NFTs</Tab>
      </SideBarTabGroup>
      <div ref={tokenRef}>
        <SideBarTabPanel index={0}>
          <TokenList container={tokenRef} />
        </SideBarTabPanel>
      </div>
      <div>
        <SideBarTabPanel index={1}>
          <NftList container={nftRef} />
        </SideBarTabPanel>
      </div>
    </Tabs>
  );
}

export default SideBarTabs;
