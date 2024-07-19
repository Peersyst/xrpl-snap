import txs from '../../../fixtures/tx';
import { AMMBidDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/AMMBidDialogStrategy/AMMBidDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  AssetComponent,
  Asset2Component,
  BidMinComponent,
  BidMaxComponent,
  AuthAccountsComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('AMMBidDialogStrategy', () => {
  let strategy: AMMBidDialogStrategy;

  beforeEach(() => {
    strategy = new AMMBidDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('AMMBid'),
      ...AccountComponent(txs.AMMBid.Account),
      ...AssetComponent(txs.AMMBid.Asset),
      ...Asset2Component(txs.AMMBid.Asset2),
      ...BidMinComponent(txs.AMMBid.BidMin),
      ...BidMaxComponent(txs.AMMBid.BidMax),
      ...AuthAccountsComponent(txs.AMMBid.AuthAccounts),
      ...FeeComponent(txs.AMMBid.Fee),
    ];

    const result = strategy.buildBody(txs.AMMBid);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const ammBid = { ...txs.AMMBid };
    delete ammBid.BidMin;
    delete ammBid.BidMax;
    delete ammBid.AuthAccounts;

    const expectedComponents = [
      ...TransactionTypeComponent('AMMBid'),
      ...AccountComponent(txs.AMMBid.Account),
      ...AssetComponent(txs.AMMBid.Asset),
      ...Asset2Component(txs.AMMBid.Asset2),
      ...FeeComponent(txs.AMMBid.Fee),
    ];

    const result = strategy.buildBody(ammBid);

    expect(result).toEqual(expectedComponents);
  });
});
