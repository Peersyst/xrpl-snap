import txs from '../../../fixtures/tx';
import { EscrowCancelDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/EscrowCancelDialogStrategy/EscrowCancelDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  OwnerComponent,
  OfferSequenceComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('EscrowCancelDialogStrategy', () => {
  let strategy: EscrowCancelDialogStrategy;

  beforeEach(() => {
    strategy = new EscrowCancelDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('EscrowCancel'),
      ...AccountComponent(txs.EscrowCancel.Account),
      ...OwnerComponent(txs.EscrowCancel.Owner),
      ...OfferSequenceComponent(txs.EscrowCancel.OfferSequence),
      ...FeeComponent(txs.EscrowCancel.Fee),
    ];

    const result = strategy.buildBody(txs.EscrowCancel);

    expect(result).toEqual(expectedComponents);
  });
});
