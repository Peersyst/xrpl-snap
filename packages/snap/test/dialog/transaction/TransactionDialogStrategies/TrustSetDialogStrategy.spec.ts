import {
  TransactionTypeComponent,
  AccountComponent,
  LimitAmountComponent,
  QualityInComponent,
  QualityOutComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { TrustSetDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/TrustSetDialogStrategy/TrustSetDialogStrategy';
import txs from '../../../fixtures/tx';

describe('TrustSetDialogStrategy', () => {
  let strategy: TrustSetDialogStrategy;

  beforeEach(() => {
    strategy = new TrustSetDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('TrustSet'),
      ...AccountComponent(txs.TrustSet.Account),
      ...LimitAmountComponent(txs.TrustSet.LimitAmount),
      ...QualityInComponent(txs.TrustSet.QualityIn),
      ...QualityOutComponent(txs.TrustSet.QualityOut),
      ...FeeComponent(txs.TrustSet.Fee),
    ];

    const result = strategy.buildBody(txs.TrustSet);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const trustSet = { ...txs.TrustSet };
    delete trustSet.QualityIn;
    delete trustSet.QualityOut;

    const expectedComponents = [
      ...TransactionTypeComponent('TrustSet'),
      ...AccountComponent(txs.TrustSet.Account),
      ...LimitAmountComponent(txs.TrustSet.LimitAmount),
      ...FeeComponent(txs.TrustSet.Fee),
    ];

    const result = strategy.buildBody(trustSet);

    expect(result).toEqual(expectedComponents);
  });
});
