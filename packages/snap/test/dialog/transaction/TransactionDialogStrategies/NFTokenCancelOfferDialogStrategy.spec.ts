import {
  TransactionTypeComponent,
  AccountComponent,
  NFTokenOffersComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { NFTokenCancelOfferDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/NFTokenCancelOfferDialogStrategy/NFTokenCancelOfferDialogStrategy';
import txs from '../../../fixtures/tx';

describe('NFTokenCancelOfferDialogStrategy', () => {
  let strategy: NFTokenCancelOfferDialogStrategy;

  beforeEach(() => {
    strategy = new NFTokenCancelOfferDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('NFTokenCancelOffer'),
      ...AccountComponent(txs.NFTokenCancelOffer.Account),
      ...NFTokenOffersComponent(txs.NFTokenCancelOffer.NFTokenOffers),
      ...FeeComponent(txs.NFTokenCancelOffer.Fee),
    ];

    const result = strategy.buildBody(txs.NFTokenCancelOffer);

    expect(result).toEqual(expectedComponents);
  });
});
