import type { Context } from '../../../src/core/Context';
import { SubmitHandler } from '../../../src/handler/transaction/SubmitHandler';
import { ProviderMock } from '../../__mocks__/core/Provider.mock';
import { WalletMock } from '../../__mocks__/core/Wallet.mock';

describe('SubmitHandler', () => {
  let handler: SubmitHandler;
  const walletMock = new WalletMock();
  const providerMock = new ProviderMock();
  const mockedContext: Context = { wallet: walletMock, provider: providerMock } as any;

  beforeEach(() => {
    handler = new SubmitHandler(mockedContext);
    jest.clearAllMocks();
  });

  test('should submit transaction and return response', async () => {
    const params = { tx_blob: 'signed_blob' };
    const response = { result: { engine_result: 'tesSUCCESS', tx_json: {} } };
    providerMock.request.mockResolvedValue(response);

    const result = await handler.handle('', params);

    expect(result).toEqual(response);
    expect(providerMock.request).toHaveBeenCalledWith({
      command: 'submit',
      tx_blob: params.tx_blob,
    });
    expect(providerMock.request).toHaveBeenCalledTimes(1);
  });
});
