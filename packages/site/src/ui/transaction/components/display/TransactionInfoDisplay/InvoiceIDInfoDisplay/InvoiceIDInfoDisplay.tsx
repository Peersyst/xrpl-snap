import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import HashInfoDisplay from '../common/HashInfoDisplay/HashInfoDisplay';

export interface InvoiceIDInfoDisplayProps {
  className?: string;
  style?: React.CSSProperties;
  invoiceID: string;
}

function InvoiceIDInfoDisplay({ className, invoiceID, ...rest }: InvoiceIDInfoDisplayProps) {
  const translate = useTranslate('transactions');

  return <HashInfoDisplay className={clsx('InvoiceIDInfoDisplay', className)} label={translate('invoiceID')} hash={invoiceID} {...rest} />;
}

export default InvoiceIDInfoDisplay;
