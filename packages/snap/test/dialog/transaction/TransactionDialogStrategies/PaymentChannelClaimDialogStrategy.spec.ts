import {
  TransactionTypeComponent,
  AccountComponent,
  ChannelComponent,
  BalanceComponent,
  AmountComponent,
  SignatureComponent,
  PublicKeyComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { PaymentChannelClaimDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/PaymentChannelClaimDialogStrategy/PaymentChannelClaimDialogStrategy';
import txs from '../../../fixtures/tx';

describe('PaymentChannelClaimDialogStrategy', () => {
  let strategy: PaymentChannelClaimDialogStrategy;

  beforeEach(() => {
    strategy = new PaymentChannelClaimDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('PaymentChannelClaim'),
      ...AccountComponent(txs.PaymentChannelClaim.Account),
      ...ChannelComponent(txs.PaymentChannelClaim.Channel),
      ...BalanceComponent(txs.PaymentChannelClaim.Balance),
      ...AmountComponent(txs.PaymentChannelClaim.Amount),
      ...SignatureComponent(txs.PaymentChannelClaim.Signature),
      ...PublicKeyComponent(txs.PaymentChannelClaim.PublicKey),
      ...FeeComponent(txs.PaymentChannelClaim.Fee),
    ];

    const result = strategy.buildBody(txs.PaymentChannelClaim);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const paymentChannelClaim = { ...txs.PaymentChannelClaim };
    delete paymentChannelClaim.Balance;
    delete paymentChannelClaim.Amount;
    delete paymentChannelClaim.Signature;
    delete paymentChannelClaim.PublicKey;

    const expectedComponents = [
      ...TransactionTypeComponent('PaymentChannelClaim'),
      ...AccountComponent(txs.PaymentChannelClaim.Account),
      ...ChannelComponent(txs.PaymentChannelClaim.Channel),
      ...FeeComponent(txs.PaymentChannelClaim.Fee),
    ];

    const result = strategy.buildBody(paymentChannelClaim);

    expect(result).toEqual(expectedComponents);
  });
});
