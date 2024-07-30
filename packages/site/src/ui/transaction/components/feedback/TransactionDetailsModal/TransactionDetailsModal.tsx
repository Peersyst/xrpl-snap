import clsx from 'clsx';
import { XrplTx } from 'common/models/transaction/tx.types';
import Modal from 'ui/common/components/feedback/Modal/Modal';
import { ModalProps } from 'ui/common/components/feedback/Modal/Modal.types';
import { useTranslate } from 'ui/locale';

import TransactionDetails from '../../display/TransactionDetails/TransactionDetails';

export interface TransactionDetailsModalProps extends Omit<ModalProps, 'title'> {
  tx: XrplTx;
}

function TransactionDetailsModal({ className, tx, ...rest }: TransactionDetailsModalProps) {
  const translate = useTranslate();
  return (
    <Modal className={clsx('TransactionDetailsModal', className)} title={translate('transaction')} {...rest}>
      <TransactionDetails tx={tx} />
    </Modal>
  );
}

export default TransactionDetailsModal;
