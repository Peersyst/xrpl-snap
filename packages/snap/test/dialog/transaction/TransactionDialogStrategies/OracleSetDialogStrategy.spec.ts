import txs from '../../../fixtures/tx';
import { OracleSetDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/OracleSetDialogStrategy/OracleSetDialogStrategy';
import {
  TransactionTypeComponent,
  AccountComponent,
  OracleDocumentIDComponent,
  LastUpdateTimeComponent,
  PriceDataSeriesComponment,
  ProviderComponent,
  URIComponent,
  AssetClassComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';

describe('OracleSetDialogStrategy', () => {
  let strategy: OracleSetDialogStrategy;

  beforeEach(() => {
    strategy = new OracleSetDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('OracleSet'),
      ...AccountComponent(txs.OracleSet.Account),
      ...OracleDocumentIDComponent(txs.OracleSet.OracleDocumentID),
      ...LastUpdateTimeComponent(txs.OracleSet.LastUpdateTime),
      ...PriceDataSeriesComponment(txs.OracleSet.PriceDataSeries),
      ...ProviderComponent(txs.OracleSet.Provider),
      ...URIComponent(txs.OracleSet.URI),
      ...AssetClassComponent(txs.OracleSet.AssetClass),
      ...FeeComponent(txs.OracleSet.Fee),
    ];

    const result = strategy.buildBody(txs.OracleSet);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const oracleSet = { ...txs.OracleSet };
    delete oracleSet.Provider;
    delete oracleSet.URI;
    delete oracleSet.AssetClass;

    const expectedComponents = [
      ...TransactionTypeComponent('OracleSet'),
      ...AccountComponent(txs.OracleSet.Account),
      ...OracleDocumentIDComponent(txs.OracleSet.OracleDocumentID),
      ...FeeComponent(txs.OracleSet.Fee),
    ];

    const result = strategy.buildBody(oracleSet);

    expect(result).toEqual(expectedComponents);
  });
});
