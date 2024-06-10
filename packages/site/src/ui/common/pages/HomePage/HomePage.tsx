import { Col } from '@peersyst/react-components';
import clsx from 'clsx';
import { useRef } from 'react';
import styled from 'styled-components';
import TransactionList from 'ui/transaction/container/TransactionList/TransactionList';
import BalanceCard from 'ui/wallet/containers/BalanceCard/BalanceCard';

export type HomePageProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const HomePageRoot = styled(Col)(({ theme }) => ({
  padding: theme.spacing[4],
  height: '100%',
}));

export const HomePageTransactionListWrapper = styled.div(({ theme }) => ({
  height: '29.75rem',
  overflowY: 'auto',
  padding: theme.spacing[4],
}));

function HomePage({ className, ...rest }: HomePageProps) {
  const refContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Col className={clsx('HomePage', className)} flex={1} {...rest}>
      <BalanceCard />
      <HomePageTransactionListWrapper ref={refContainerRef}>
        <TransactionList container={refContainerRef} />
      </HomePageTransactionListWrapper>
    </Col>
  );
}

export default HomePage;