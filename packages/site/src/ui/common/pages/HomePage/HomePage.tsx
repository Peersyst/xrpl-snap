import { Col } from '@peersyst/react-components';
import clsx from 'clsx';
import BalanceCard from 'ui/wallet/containers/BalanceCard/BalanceCard';

import HomeTransactions from './HomeTransactions';

export type HomePageProps = {
  className?: string;
  style?: React.CSSProperties;
};

function HomePage({ className, ...rest }: HomePageProps) {
  return (
    <Col className={clsx('HomePage', className)} flex={1} {...rest}>
      <BalanceCard />
      <HomeTransactions />
    </Col>
  );
}

export default HomePage;
