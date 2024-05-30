import { Col } from '@peersyst/react-components';
import clsx from 'clsx';
import BalanceCard from 'ui/wallet/container/BalanceCard/BalanceCard';
import TransactionList from 'ui/transaction/container/TransactionList/TransactionList';
import styled from 'styled-components';

export interface HomePageProps {
  className?: string;
  style?: React.CSSProperties;
}

export const HomePageRoot = styled(Col)(({ theme }) => ({
  padding: theme.spacing[4],
  height: '100%',
}));

export const HomePageTransactionList = styled(TransactionList)(({ theme }) => ({
  height: '29.75rem',
  overflowY: 'auto',
  padding: theme.spacing[8],
}));

function HomePage({ className, ...rest }: HomePageProps) {
  return (
    <Col className={clsx('HomePage', className)} flex={1} {...rest}>
      <BalanceCard />
      <HomePageTransactionList />
    </Col>
  );
}

export default HomePage;
