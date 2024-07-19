import {
  TransactionTypeComponent,
  AccountComponent,
  AssetComponent,
  Asset2Component,
  AmountComponent,
  Amount2Component,
  EPriceComponent,
  LPTokenInComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { AMMWithdrawDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/AMMWithdrawDialogStrategy/AMMWithdrawDialogStrategy';
import txs from '../../../fixtures/tx';

describe('AMMWithdrawDialogStrategy', () => {
  let strategy: AMMWithdrawDialogStrategy;

  beforeEach(() => {
    strategy = new AMMWithdrawDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('AMMWithdraw'),
      ...AccountComponent(txs.AMMWithdraw.Account),
      ...AssetComponent(txs.AMMWithdraw.Asset),
      ...Asset2Component(txs.AMMWithdraw.Asset2),
      ...AmountComponent(txs.AMMWithdraw.Amount),
      ...Amount2Component(txs.AMMWithdraw.Amount2),
      ...EPriceComponent(txs.AMMWithdraw.EPrice),
      ...LPTokenInComponent(txs.AMMWithdraw.LPTokenIn),
      ...FeeComponent(txs.AMMWithdraw.Fee),
    ];

    const result = strategy.buildBody(txs.AMMWithdraw);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const ammWithdraw = { ...txs.AMMWithdraw };
    delete ammWithdraw.EPrice;
    delete ammWithdraw.LPTokenIn;

    const expectedComponents = [
      ...TransactionTypeComponent('AMMWithdraw'),
      ...AccountComponent(txs.AMMWithdraw.Account),
      ...AssetComponent(txs.AMMWithdraw.Asset),
      ...Asset2Component(txs.AMMWithdraw.Asset2),
      ...AmountComponent(txs.AMMWithdraw.Amount),
      ...Amount2Component(txs.AMMWithdraw.Amount2),
      ...FeeComponent(txs.AMMWithdraw.Fee),
    ];

    const result = strategy.buildBody(ammWithdraw);

    expect(result).toEqual(expectedComponents);
  });
});
