import txs from '../../../fixtures/tx';
import { AMMCreateDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/AMMCreateDialogStrategy/AMMCreateDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  AmountComponent,
  Amount2Component,
  TradingFeeComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('AMMCreateDialogStrategy', () => {
  let strategy: AMMCreateDialogStrategy;

  beforeEach(() => {
    strategy = new AMMCreateDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('AMMCreate'),
      ...AccountComponent(txs.AMMCreate.Account),
      ...AmountComponent(txs.AMMCreate.Amount),
      ...Amount2Component(txs.AMMCreate.Amount2),
      ...TradingFeeComponent(txs.AMMCreate.TradingFee),
      ...FeeComponent(txs.AMMCreate.Fee),
    ];

    const result = strategy.buildBody(txs.AMMCreate);

    expect(result).toEqual(expectedComponents);
  });
});
