import { UserRejectedRequestError } from '@metamask/snaps-sdk';

import { ExtractPrivateKeyDialog } from '../../../src/dialog/account/ExtractPrivateKeyDialog';
import { ExtractPrivateKeyRequestDialog } from '../../../src/dialog/account/ExtractPrivateKeyRequestDialog';
import { ExtractPrivateKeyHandler } from '../../../src/handler/account/ExtractPrivateKeyHandler';
import { WalletMock } from '../../__mocks__/core/Wallet.mock';

describe('ExtractPrivateKeyHandler', () => {
  let handler: ExtractPrivateKeyHandler;
  const walletMock = new WalletMock();
  const mockedContext = { wallet: walletMock };

  beforeEach(() => {
    handler = new ExtractPrivateKeyHandler(mockedContext as any);
    jest.clearAllMocks();
  });

  test('should return an empty object when the request is accepted', async () => {
    const mockedExtractPrivateKeyRequestDialog = jest.fn().mockResolvedValue(true);
    jest.spyOn(ExtractPrivateKeyRequestDialog, 'prompt').mockImplementation(mockedExtractPrivateKeyRequestDialog);

    const mockedExtractPrivateKeyDialog = jest.fn().mockResolvedValue(undefined);
    jest.spyOn(ExtractPrivateKeyDialog, 'prompt').mockImplementation(mockedExtractPrivateKeyDialog);

    const result = await handler.handle();

    expect(result).toEqual({});

    expect(mockedExtractPrivateKeyDialog).toHaveBeenCalledTimes(1);
    expect(mockedExtractPrivateKeyRequestDialog).toHaveBeenCalledTimes(1);
  });

  test('should throw UserRejectedRequestError when the request is rejected', async () => {
    const mockedExtractPrivateKeyRequestDialog = jest.fn().mockResolvedValue(false);
    jest.spyOn(ExtractPrivateKeyRequestDialog, 'prompt').mockImplementation(mockedExtractPrivateKeyRequestDialog);

    await expect(handler.handle()).rejects.toThrow(UserRejectedRequestError);

    expect(mockedExtractPrivateKeyRequestDialog).toHaveBeenCalledTimes(1);
  });
});
