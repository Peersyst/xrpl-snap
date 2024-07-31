import clsx from 'clsx';

import TransactionReviewer from '../container/TransactionReviewer/TransactionReviewer';

export interface ReviewTransactionPageProps {
  className?: string;
  style?: React.CSSProperties;
}

function ReviewTransactionPage({ className, ...rest }: ReviewTransactionPageProps) {
  return <TransactionReviewer className={clsx('ReviewTransactionPage', className)} {...rest} />;
}

export default ReviewTransactionPage;
