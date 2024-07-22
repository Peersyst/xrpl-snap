import {
  TransactionTypeComponent,
  AccountComponent,
  DataComponent,
  URIComponent,
  DIDDocumentComponent,
  FeeComponent,
} from '../../../../src/dialog/transaction/TransactionComponents';
import { DIDSetDialogStrategy } from '../../../../src/dialog/transaction/TransactionDialogStrategies/DIDSetDialogStrategy/DIDSetDialogStrategy';
import txs from '../../../fixtures/tx';

describe('DIDSetDialogStrategy', () => {
  let strategy: DIDSetDialogStrategy;

  beforeEach(() => {
    strategy = new DIDSetDialogStrategy();
  });

  test('Builds body correctly', () => {
    const expectedComponents = [
      ...TransactionTypeComponent('DIDSet'),
      ...AccountComponent(txs.DIDSet.Account),
      ...DataComponent(txs.DIDSet.Data),
      ...URIComponent(txs.DIDSet.URI),
      ...DIDDocumentComponent(txs.DIDSet.DIDDocument),
      ...FeeComponent(txs.DIDSet.Fee),
    ];

    const result = strategy.buildBody(txs.DIDSet);

    expect(result).toEqual(expectedComponents);
  });

  test("Does not fail if optional fields aren't present", () => {
    const didSet = { ...txs.DIDSet };
    delete didSet.Data;
    delete didSet.URI;
    delete didSet.DIDDocument;

    const expectedComponents = [
      ...TransactionTypeComponent('DIDSet'),
      ...AccountComponent(txs.DIDSet.Account),
      ...FeeComponent(txs.DIDSet.Fee),
    ];

    const result = strategy.buildBody(didSet);

    expect(result).toEqual(expectedComponents);
  });
});
