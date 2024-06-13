import type { Component } from '@metamask/snaps-sdk';
import type { Payment, Transaction } from 'xrpl';

import { DeliverMinComponent, SendMaxComponent } from '../../TransactionComponents';
import {
  AccountComponent,
  AmountComponent,
  DestinationComponent,
  DestinationTagComponent,
  FeeComponent,
  InvoiceIDComponent,
  TransactionTypeComponent,
} from '../TransactionComponents/TransactionComponents';
import type { TransactionDialogStrategy } from '../TransactionDialogStrategies.types';

export class PaymentDialogStrategy implements TransactionDialogStrategy<Payment> {
  transactionType: Transaction['TransactionType'] = 'Payment';

  /**
   * Builds the body of the dialog for a Payment transaction.
   * Supported fields:
   * - TransactionType
   * - Account
   * - Destination (string)
   * - Amount (XRP or IssuedCurrency)
   * - DestinationTag (number)
   * - InvoiceID (string)
   * - SendMax (Amount)
   * - DeliverMin (Amount)
   * TODO(jordi) Missing fields:
   * - Flags
   * - Paths
   *
   * @param payment - Payment transaction
   * @returns Components to render in the dialog
   */
  buildBody(payment: Payment): Component[] {
    return [
      ...TransactionTypeComponent(this.transactionType),
      ...AccountComponent(payment.Account),
      ...DestinationComponent(payment.Destination),
      ...AmountComponent(payment.Amount),
      ...FeeComponent(payment.Fee),
      ...DestinationTagComponent(payment.DestinationTag),
      ...InvoiceIDComponent(payment.InvoiceID),
      ...DeliverMinComponent(payment.DeliverMin),
      ...SendMaxComponent(payment.SendMax),
    ];
  }
}
