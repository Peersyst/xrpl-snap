import txs from '../../../fixtures/tx';
import { DIDDeleteDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/DIDDeleteDialogStrategy/DIDDeleteDialogStrategy';
import { TransactionTypeComponent, AccountComponent, FeeComponent } from '../../../../src/dialog/transaction/TransactionComponents';

describe('DIDDeleteDialogStrategy', () => {
  let strategy: DIDDeleteDialogStrategy;

  beforeEach(() => {
    strategy = new DIDDeleteDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('DIDDelete'),
      ...AccountComponent(txs.DIDDelete.Account),
      ...FeeComponent(txs.DIDDelete.Fee),
    ];

    const result = strategy.buildBody(txs.DIDDelete);

    expect(result).toEqual(expectedComponents);
  });
});
