import type { Component } from '@metamask/snaps-sdk';
import type { AccountSet, Transaction } from 'xrpl';

import {
  AccountComponent,
  ClearFlagComponent,
  DomainComponent,
  EmailHashComponent,
  FeeComponent,
  MessageKeyComponent,
  NFTokenMinterComponent,
  TickSizeComponent,
  TransactionTypeComponent,
  TransferRateComponent,
  MemosComponent,
} from '../../TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class AccountSetDialogStrategy implements TransactionDialogStrategy<AccountSet> {
  transactionType: Transaction['TransactionType'] = 'AccountSet';

  /**
   * Builds the body of the dialog for a AccountSet transaction.
   * Supported fields:
   * - TransactionType
   * - Account (string)
   * - ClearFlag (number)
   * - Domain (string)
   * - EmailHash (string)
   * - MessageKey (string)
   * - TickSize (number)
   * - TransferRate (number)
   * - NFTokenMinter (string)
   * - Memos (Memo[])
   * - Fee (drops)
   *
   * TODO(jordi): Missing fields:
   * - Flags
   * - SetFlag
   *
   * @param accountSet
   * @returns Components to render in the dialog
   */
  buildBody(accountSet: AccountSet): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(accountSet.Account),
      ...ClearFlagComponent(accountSet.ClearFlag),
      ...DomainComponent(accountSet.Domain),
      ...EmailHashComponent(accountSet.EmailHash),
      ...MessageKeyComponent(accountSet.MessageKey),
      ...TickSizeComponent(accountSet.TickSize),
      ...TransferRateComponent(accountSet.TransferRate),
      ...NFTokenMinterComponent(accountSet.NFTokenMinter),
      ...MemosComponent(accountSet.Memos),
      ...FeeComponent(accountSet.Fee),
    ];
  }
}
