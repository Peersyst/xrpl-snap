import {
  TransactionTypeComponent,
  AccountComponent,
  AmountComponent,
  DestinationComponent,
  SettleDelayComponent,
  PublicKeyComponent,
  CancelAfterComponent,
  DestinationTagComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { PaymentChannelCreateDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/PaymentChannelCreateDialogStrategy/PaymentChannelCreateDialogStrategy';
import txs from '../../../fixtures/tx';

describe('PaymentChannelCreateDialogStrategy', () => {
  let strategy: PaymentChannelCreateDialogStrategy;

  beforeEach(() => {
    strategy = new PaymentChannelCreateDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('PaymentChannelCreate'),
      ...AccountComponent(txs.PaymentChannelCreate.Account),
      ...AmountComponent(txs.PaymentChannelCreate.Amount),
      ...DestinationComponent(txs.PaymentChannelCreate.Destination),
      ...SettleDelayComponent(txs.PaymentChannelCreate.SettleDelay),
      ...PublicKeyComponent(txs.PaymentChannelCreate.PublicKey),
      ...CancelAfterComponent(txs.PaymentChannelCreate.CancelAfter),
      ...DestinationTagComponent(txs.PaymentChannelCreate.DestinationTag),
      ...FeeComponent(txs.PaymentChannelCreate.Fee),
    ];

    const result = strategy.buildBody(txs.PaymentChannelCreate);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const paymentChannelCreate = { ...txs.PaymentChannelCreate };
    delete paymentChannelCreate.CancelAfter;
    delete paymentChannelCreate.DestinationTag;

    const expectedComponents = [
      ...TransactionTypeComponent('PaymentChannelCreate'),
      ...AccountComponent(txs.PaymentChannelCreate.Account),
      ...AmountComponent(txs.PaymentChannelCreate.Amount),
      ...DestinationComponent(txs.PaymentChannelCreate.Destination),
      ...SettleDelayComponent(txs.PaymentChannelCreate.SettleDelay),
      ...PublicKeyComponent(txs.PaymentChannelCreate.PublicKey),
      ...FeeComponent(txs.PaymentChannelCreate.Fee),
    ];

    const result = strategy.buildBody(paymentChannelCreate);

    expect(result).toEqual(expectedComponents);
  });
});
