import { XrplTx } from 'common/models/transaction/tx.types';

const IN_TRANSACTION_TYPES = ['AMMDeposit', 'AMMCreate'];

export function getTransactionDirection(transaction: XrplTx, address: string): 'out' | 'in' {
  if (IN_TRANSACTION_TYPES.includes(transaction.TransactionType)) {
    return 'in';
  }
  if ('Destination' in transaction && transaction.Destination === transaction.Account) {
    return 'in';
  }
  return transaction.Account === address ? 'out' : 'in';
}

export function extractTransactionProps(transaction: XrplTx, address: string) {
  const direction: 'out' | 'in' = getTransactionDirection(transaction, address);

  const account = direction === 'out' ? (transaction as { Destination: string }).Destination || transaction.Account : transaction.Account;

  return { direction, account, txHash: transaction.hash ?? '', txType: transaction.TransactionType };
}
