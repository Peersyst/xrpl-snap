import txs from '../../../fixtures/tx';
import { NFTokenCreateOfferDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/NFTokenCreateOfferDialogStrategy/NFTokenCreateOfferDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  NFTokenIDComponent,
  AmountComponent,
  OwnerComponent,
  ExpirationComponent,
  DestinationComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('NFTokenCreateOfferDialogStrategy', () => {
  let strategy: NFTokenCreateOfferDialogStrategy;

  beforeEach(() => {
    strategy = new NFTokenCreateOfferDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('NFTokenCreateOffer'),
      ...AccountComponent(txs.NFTokenCreateOffer.Account),
      ...NFTokenIDComponent(txs.NFTokenCreateOffer.NFTokenID),
      ...AmountComponent(txs.NFTokenCreateOffer.Amount),
      ...OwnerComponent(txs.NFTokenCreateOffer.Owner),
      ...ExpirationComponent(txs.NFTokenCreateOffer.Expiration),
      ...DestinationComponent(txs.NFTokenCreateOffer.Destination),
      ...FeeComponent(txs.NFTokenCreateOffer.Fee),
    ];

    const result = strategy.buildBody(txs.NFTokenCreateOffer);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const nftokenCreateOffer = { ...txs.NFTokenCreateOffer };
    delete nftokenCreateOffer.Owner;
    delete nftokenCreateOffer.Expiration;
    delete nftokenCreateOffer.Destination;

    const expectedComponents = [
      ...TransactionTypeComponent('NFTokenCreateOffer'),
      ...AccountComponent(txs.NFTokenCreateOffer.Account),
      ...NFTokenIDComponent(txs.NFTokenCreateOffer.NFTokenID),
      ...AmountComponent(txs.NFTokenCreateOffer.Amount),
      ...FeeComponent(txs.NFTokenCreateOffer.Fee),
    ];

    const result = strategy.buildBody(nftokenCreateOffer);

    expect(result).toEqual(expectedComponents);
  });
});
