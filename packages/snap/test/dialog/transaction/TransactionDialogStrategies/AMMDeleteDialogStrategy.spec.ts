import {
  TransactionTypeComponent,
  AccountComponent,
  AssetComponent,
  Asset2Component,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { AMMDeleteDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/AMMDeleteDialogStrategy/AMMDeleteDialogStrategy';
import txs from '../../../fixtures/tx';

describe('AMMDeleteDialogStrategy', () => {
  let strategy: AMMDeleteDialogStrategy;

  beforeEach(() => {
    strategy = new AMMDeleteDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('AMMDelete'),
      ...AccountComponent(txs.AMMDelete.Account),
      ...AssetComponent(txs.AMMDelete.Asset),
      ...Asset2Component(txs.AMMDelete.Asset2),
      ...FeeComponent(txs.AMMDelete.Fee),
    ];

    const result = strategy.buildBody(txs.AMMDelete);

    expect(result).toEqual(expectedComponents);
  });
});
