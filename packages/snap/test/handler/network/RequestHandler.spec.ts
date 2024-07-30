import type { Request as XrplRequest } from 'xrpl';

import type { Context } from '../../../src/core/Context';
import { RequestHandler } from '../../../src/handler/network/RequestHandler';
import { ProviderMock } from '../../__mocks__/core/Provider.mock';
import { WalletMock } from '../../__mocks__/core/Wallet.mock';

describe('RequestHandler', () => {
  let handler: RequestHandler;
  const walletMock = new WalletMock();
  const providerMock = new ProviderMock();
  const mockedContext: Context = { wallet: walletMock, provider: providerMock } as any;

  beforeEach(() => {
    handler = new RequestHandler(mockedContext);
    jest.clearAllMocks();
  });

  test('should send request and return response', async () => {
    const request: XrplRequest = {
      command: 'account_info',
      account: 'rEXAMPLE',
    };
    const response = { result: { account_data: { Account: 'rXYZ' } } };
    providerMock.request.mockResolvedValue(response);

    const result = await handler.handle('', request);

    expect(result).toEqual(response);
    expect(providerMock.request).toHaveBeenCalledWith(request);
    expect(providerMock.request).toHaveBeenCalledTimes(1);
  });
});
