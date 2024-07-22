import {
  TransactionTypeComponent,
  AccountComponent,
  DestinationComponent,
  AmountComponent,
  FeeComponent,
  DestinationTagComponent,
  InvoiceIDComponent,
  DeliverMinComponent,
  SendMaxComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { PaymentDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/PaymentDialogStrategy/PaymentDialogStrategy';
import txs from '../../../fixtures/tx';

describe('PaymentDialogStrategy', () => {
  let strategy: PaymentDialogStrategy;

  beforeEach(() => {
    strategy = new PaymentDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('Payment'),
      ...AccountComponent(txs.Payment.Account),
      ...DestinationComponent(txs.Payment.Destination),
      ...AmountComponent(txs.Payment.Amount),
      ...FeeComponent(txs.Payment.Fee),
      ...DestinationTagComponent(txs.Payment.DestinationTag),
      ...InvoiceIDComponent(txs.Payment.InvoiceID),
      ...DeliverMinComponent(txs.Payment.DeliverMin),
      ...SendMaxComponent(txs.Payment.SendMax),
    ];

    const result = strategy.buildBody(txs.Payment);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const payment = { ...txs.Payment };
    delete payment.DestinationTag;
    delete payment.InvoiceID;
    delete payment.DeliverMin;
    delete payment.SendMax;

    const expectedComponents = [
      ...TransactionTypeComponent('Payment'),
      ...AccountComponent(txs.Payment.Account),
      ...DestinationComponent(txs.Payment.Destination),
      ...AmountComponent(txs.Payment.Amount),
      ...FeeComponent(txs.Payment.Fee),
    ];

    const result = strategy.buildBody(payment);

    expect(result).toEqual(expectedComponents);
  });
});
