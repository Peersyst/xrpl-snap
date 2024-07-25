import { XrplTx } from 'common/models/transaction/tx.types';
import Amount from 'common/utils/Amount';
import { rippleTimeToUnixTime } from 'xrpl';

import type { Token } from '../../../../../common/models/token';

export function getTransactionAmount(tx: XrplTx, token?: Token): Amount | undefined {
  if (!token) {
    return;
  }
  if ('Amount' in tx) {
    if (typeof tx.Amount === 'string') {
      return new Amount(tx.Amount, 6, 'XRP');
    } else if (typeof tx.Amount === 'object') {
      return Amount.fromDecToken(tx.Amount.value, token);
    }
  }
}

export function getTransactionToken(tx: XrplTx): Token | undefined {
  if ('Amount' in tx && typeof tx.Amount !== undefined) {
    if (typeof tx.Amount === 'string') {
      return { currency: 'XRP', issuer: '', decimals: 6 };
    }
    return { currency: tx.Amount?.currency || '', issuer: tx.Amount?.issuer || '', decimals: 15 };
  }
}

export function getTransactionDirection(transaction: XrplTx, address: string): 'out' | 'in' {
  if ('Destination' in transaction && transaction.Destination === transaction.Account) {
    return 'in';
  }
  return transaction.Account === address ? 'out' : 'in';
}

export function extractTransactionProps(transaction: XrplTx, address: string) {
  const direction: 'out' | 'in' = getTransactionDirection(transaction, address);
  const timestamp = rippleTimeToUnixTime(transaction.date!);
  // @ts-ignore
  const account = direction === 'out' ? transaction.Destination || transaction.Account : transaction.Account;
  const token = getTransactionToken(transaction);
  const amount = getTransactionAmount(transaction, token);
  return { direction, timestamp, account, token, amount, txHash: transaction.hash ?? '', txType: transaction.TransactionType };
}
