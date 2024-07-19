import txs from '../../../fixtures/tx';
import { OfferCancelDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/OfferCancelDialogStrategy/OfferCancelDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  OfferSequenceComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('OfferCancelDialogStrategy', () => {
  let strategy: OfferCancelDialogStrategy;

  beforeEach(() => {
    strategy = new OfferCancelDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('OfferCancel'),
      ...AccountComponent(txs.OfferCancel.Account),
      ...OfferSequenceComponent(txs.OfferCancel.OfferSequence),
      ...FeeComponent(txs.OfferCancel.Fee),
    ];

    const result = strategy.buildBody(txs.OfferCancel);

    expect(result).toEqual(expectedComponents);
  });
});
