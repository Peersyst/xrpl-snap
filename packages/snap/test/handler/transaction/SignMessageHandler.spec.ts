import { UserRejectedRequestError } from '@metamask/snaps-sdk';

import type { Context } from '../../../src/core/Context';
import { SignMessageDialog } from '../../../src/dialog/transaction/SignMessageDialog';
import { SignMessageHandler } from '../../../src/handler/transaction/SignMessageHandler';
import { WalletMock } from '../../__mocks__/core/Wallet.mock';

describe('SignMessageHandler', () => {
  let handler: SignMessageHandler;
  const walletMock = new WalletMock();
  const mockedContext: Context = { wallet: walletMock } as any;

  beforeEach(() => {
    handler = new SignMessageHandler(mockedContext);
    jest.clearAllMocks();
  });

  test('should sign message and return signature', async () => {
    const params = { message: 'Test message' };
    const signature = 'signed_message';

    const mockedPrompt = jest.fn().mockResolvedValue(true);
    jest.spyOn(SignMessageDialog, 'prompt').mockImplementation(mockedPrompt);

    walletMock.signMessage.mockReturnValue(signature);

    const result = await handler.handle('https://origin', params);

    expect(result).toEqual({ signature });
    expect(mockedPrompt).toHaveBeenCalledWith('https://origin', params.message);
    expect(walletMock.signMessage).toHaveBeenCalledWith(params.message);
    expect(mockedPrompt).toHaveBeenCalledTimes(1);
    expect(walletMock.signMessage).toHaveBeenCalledTimes(1);
  });

  test('should throw UserRejectedRequestError when user rejects the message signing', async () => {
    const params = { message: 'Test message' };

    const mockedPrompt = jest.fn().mockResolvedValue(false);
    jest.spyOn(SignMessageDialog, 'prompt').mockImplementation(mockedPrompt);

    await expect(handler.handle('https://origin', params)).rejects.toThrow(UserRejectedRequestError);
    expect(mockedPrompt).toHaveBeenCalledWith('https://origin', params.message);
    expect(mockedPrompt).toHaveBeenCalledTimes(1);
    expect(walletMock.signMessage).not.toHaveBeenCalled();
  });
});
