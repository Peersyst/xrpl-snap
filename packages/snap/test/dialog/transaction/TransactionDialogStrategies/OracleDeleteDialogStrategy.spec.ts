import {
  TransactionTypeComponent,
  AccountComponent,
  OracleDocumentIDComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { OracleDeleteDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/OracleDeleteDialogStrategy/OracleDeleteDialogStrategy';
import txs from '../../../fixtures/tx';

describe('OracleDeleteDialogStrategy', () => {
  let strategy: OracleDeleteDialogStrategy;

  beforeEach(() => {
    strategy = new OracleDeleteDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('OracleDelete'),
      ...AccountComponent(txs.OracleDelete.Account),
      ...OracleDocumentIDComponent(txs.OracleDelete.OracleDocumentID),
      ...FeeComponent(txs.OracleDelete.Fee),
    ];

    const result = strategy.buildBody(txs.OracleDelete);

    expect(result).toEqual(expectedComponents);
  });
});
