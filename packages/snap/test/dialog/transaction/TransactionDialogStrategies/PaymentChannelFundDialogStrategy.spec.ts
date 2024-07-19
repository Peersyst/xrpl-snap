import txs from '../../../fixtures/tx';
import { PaymentChannelFundDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/PaymentChannelFundDialogStrategy/PaymentChannelFundDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  ChannelComponent,
  AmountComponent,
  ExpirationComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('PaymentChannelFundDialogStrategy', () => {
  let strategy: PaymentChannelFundDialogStrategy;

  beforeEach(() => {
    strategy = new PaymentChannelFundDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('PaymentChannelFund'),
      ...AccountComponent(txs.PaymentChannelFund.Account),
      ...ChannelComponent(txs.PaymentChannelFund.Channel),
      ...AmountComponent(txs.PaymentChannelFund.Amount),
      ...ExpirationComponent(txs.PaymentChannelFund.Expiration),
      ...FeeComponent(txs.PaymentChannelFund.Fee),
    ];

    const result = strategy.buildBody(txs.PaymentChannelFund);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const paymentChannelFund = { ...txs.PaymentChannelFund };
    delete paymentChannelFund.Expiration;

    const expectedComponents = [
      ...TransactionTypeComponent('PaymentChannelFund'),
      ...AccountComponent(txs.PaymentChannelFund.Account),
      ...ChannelComponent(txs.PaymentChannelFund.Channel),
      ...AmountComponent(txs.PaymentChannelFund.Amount),
      ...FeeComponent(txs.PaymentChannelFund.Fee),
    ];

    const result = strategy.buildBody(paymentChannelFund);

    expect(result).toEqual(expectedComponents);
  });
});
