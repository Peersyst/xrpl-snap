import {
  TransactionTypeComponent,
  AccountComponent,
  NFTokenTaxonComponent,
  IssuerComponent,
  TransferFeeComponent,
  URIComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { NFTokenMintDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/NFTokenMintDialogStrategy/NFTokenMintDialogStrategy';
import txs from '../../../fixtures/tx';

describe('NFTokenMintDialogStrategy', () => {
  let strategy: NFTokenMintDialogStrategy;

  beforeEach(() => {
    strategy = new NFTokenMintDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('NFTokenMint'),
      ...AccountComponent(txs.NFTokenMint.Account),
      ...NFTokenTaxonComponent(txs.NFTokenMint.NFTokenTaxon),
      ...IssuerComponent(txs.NFTokenMint.Issuer),
      ...TransferFeeComponent(txs.NFTokenMint.TransferFee),
      ...URIComponent(txs.NFTokenMint.URI),
      ...FeeComponent(txs.NFTokenMint.Fee),
    ];

    const result = strategy.buildBody(txs.NFTokenMint);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const nftokenMint = { ...txs.NFTokenMint };
    delete nftokenMint.Issuer;
    delete nftokenMint.TransferFee;
    delete nftokenMint.URI;

    const expectedComponents = [
      ...TransactionTypeComponent('NFTokenMint'),
      ...AccountComponent(txs.NFTokenMint.Account),
      ...NFTokenTaxonComponent(txs.NFTokenMint.NFTokenTaxon),
      ...FeeComponent(txs.NFTokenMint.Fee),
    ];

    const result = strategy.buildBody(nftokenMint);

    expect(result).toEqual(expectedComponents);
  });
});
