import { Col } from '@peersyst/react-components';
import clsx from 'clsx';
import { useRef } from 'react';
import TransactionList from 'ui/transaction/container/TransactionList/TransactionList';
import BalanceCard from 'ui/wallet/containers/BalanceCard/BalanceCard';

import { HomePageTransactionListWrapper, HomeTransactionListShaddow } from './HomePage.styles';

export type HomePageProps = {
  className?: string;
  style?: React.CSSProperties;
};

function HomePage({ className, ...rest }: HomePageProps) {
  const refContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Col className={clsx('HomePage', className)} flex={1} {...rest}>
      <BalanceCard />
      <div css={{ position: 'relative' }}>
        <HomePageTransactionListWrapper ref={refContainerRef} css={{ position: 'relative' }}>
          <TransactionList container={refContainerRef} />
        </HomePageTransactionListWrapper>
        <HomeTransactionListShaddow />
      </div>
    </Col>
  );
}

export default HomePage;
