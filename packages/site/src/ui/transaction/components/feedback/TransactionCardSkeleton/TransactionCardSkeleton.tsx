import Amount from 'common/utils/Amount';

import TransactionCard from '../../display/TransactionCard/TransactionCard';

export const TransactionCardSkeleton = (): JSX.Element => (
  <TransactionCard
    txType="Payment"
    txHash=""
    direction="in"
    timestamp={new Date().getTime()}
    account="raQwCVAJVqjrVm1Nj5SFRcX8i22BhdC9WA"
    amount={new Amount('46791', 2, 'USD')}
    token={{ currency: 'USD', issuer: '', decimals: 0 }}
    loading
  />
);
