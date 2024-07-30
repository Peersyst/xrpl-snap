import { InvalidParamsError, UserRejectedRequestError } from '@metamask/snaps-sdk';
import type * as Xrpl from 'xrpl';

import type { Context } from '../../../src/core/Context';
import { TransactionDialog } from '../../../src/dialog/transaction/TransactionDialog';
import { SignHandler } from '../../../src/handler/transaction/SignHandler';
import { ProviderMock } from '../../__mocks__/core/Provider.mock';
import { WalletMock } from '../../__mocks__/core/Wallet.mock';

describe('SignHandler', () => {
  let handler: SignHandler;
  const walletMock = new WalletMock();
  const providerMock = new ProviderMock();
  const mockedContext: Context = { wallet: walletMock, provider: providerMock } as any;

  beforeEach(() => {
    handler = new SignHandler(mockedContext);
    jest.clearAllMocks();
  });

  const txParams: Xrpl.Payment = {
    TransactionType: 'Payment',
    Account: 'rM9WCfJU6udpFkvKThRaFHDMsp7L8rpgN',
    Amount: {
      currency: 'FOO',
      value: '4000',
      issuer: 'rPzwM2JfCSDjhbesdTCqFjWWdK7eFtTwZz',
    },
    Destination: 'rPzwM2JfCSDjhbesdTCqFjWWdK7eFtTwZz',
    Flags: 131072,
    LastLedgerSequence: 21971016,
  };

  const autofilledTransaction = { ...txParams, Fee: '10', Sequence: 21970996 };
  const signedTransaction = { tx_blob: 'signed_blob', hash: 'signed_hash' };

  test('should sign and return transaction blob and hash', async () => {
    providerMock.autofill.mockResolvedValue(autofilledTransaction);

    const mockedPrompt = jest.fn().mockResolvedValue(true);
    jest.spyOn(TransactionDialog, 'prompt').mockImplementation(mockedPrompt);

    walletMock.sign.mockReturnValue(signedTransaction);

    const result = await handler.handle('https://origin', txParams);

    expect(result).toEqual(signedTransaction);
    expect(providerMock.autofill).toHaveBeenCalledWith(txParams);
    expect(mockedPrompt).toHaveBeenCalledWith('https://origin', autofilledTransaction);
    expect(walletMock.sign).toHaveBeenCalledWith(autofilledTransaction);
    expect(providerMock.autofill).toHaveBeenCalledTimes(1);
    expect(mockedPrompt).toHaveBeenCalledTimes(1);
    expect(walletMock.sign).toHaveBeenCalledTimes(1);
  });

  test('should throw InvalidParamsError when transaction validation fails', async () => {
    const invalidTx = { ...txParams, TransactionType: 'invalid' };

    providerMock.autofill.mockResolvedValue({ ...invalidTx, Fee: '10', Sequence: 21970996 });

    await expect(handler.handle('https://origin', invalidTx as any)).rejects.toThrow(InvalidParamsError);
  });

  test('should throw UserRejectedRequestError when user rejects the transaction', async () => {
    providerMock.autofill.mockResolvedValue(autofilledTransaction);

    const mockedPrompt = jest.fn().mockResolvedValue(false);
    jest.spyOn(TransactionDialog, 'prompt').mockImplementation(mockedPrompt);

    await expect(handler.handle('https://origin', txParams)).rejects.toThrow(UserRejectedRequestError);

    expect(providerMock.autofill).toHaveBeenCalledWith(txParams);
    expect(mockedPrompt).toHaveBeenCalledWith('https://origin', autofilledTransaction);
    expect(providerMock.autofill).toHaveBeenCalledTimes(1);
    expect(mockedPrompt).toHaveBeenCalledTimes(1);
  });
});
