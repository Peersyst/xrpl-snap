import { InvalidParamsError, UserRejectedRequestError } from '@metamask/snaps-sdk';
import type * as Xrpl from 'xrpl';

import type { Context } from '../../../src/core/Context';
import { TransactionDialog } from '../../../src/dialog/transaction/TransactionDialog';
import { SignForHandler } from '../../../src/handler/transaction/SignForHandler';
import { ProviderMock } from '../../__mocks__/core/Provider.mock';
import { MOCKED_ADDRESS, WalletMock } from '../../__mocks__/core/Wallet.mock';

describe('SignForHandler', () => {
  let handler: SignForHandler;
  const walletMock = new WalletMock();
  const providerMock = new ProviderMock();
  const mockedContext: Context = { wallet: walletMock, provider: providerMock } as any;

  beforeEach(() => {
    handler = new SignForHandler(mockedContext);
    jest.clearAllMocks();
  });

  const txParams: Xrpl.Payment = {
    TransactionType: 'Payment',
    Account: 'rM9WCfJU6udpFkvKThRaFHDMsp7L8rpgN',
    Amount: '1000000',
    Destination: 'rPzwM2JfCSDjhbesdTCqFjWWdK7eFtTwZz',
    Fee: '30',
    Sequence: 0,
    TicketSequence: 12,
    SigningPubKey: '',
  };
  const signedTransaction = { tx_blob: 'multisigned_blob', hash: 'multisigned_hash' };

  test('should multisign the transaction as provided, without autofill', async () => {
    const mockedPrompt = jest.fn().mockResolvedValue(true);
    jest.spyOn(TransactionDialog, 'prompt').mockImplementation(mockedPrompt);
    walletMock.sign.mockReturnValue(signedTransaction);

    const result = await handler.handle('https://origin', txParams);

    expect(result).toEqual(signedTransaction);
    expect(providerMock.autofill).not.toHaveBeenCalled();
    expect(mockedPrompt).toHaveBeenCalledWith('https://origin', txParams, { signingFor: txParams.Account });
    expect(walletMock.sign).toHaveBeenCalledWith(txParams, true);
  });

  test('should set an omitted SigningPubKey to an empty string', async () => {
    jest.spyOn(TransactionDialog, 'prompt').mockResolvedValue(true);
    const { SigningPubKey: _omitted, ...withoutKey } = txParams;

    await handler.handle('https://origin', withoutKey as Xrpl.Payment);

    expect(walletMock.sign).toHaveBeenCalledWith({ ...withoutKey, SigningPubKey: '' }, true);
  });

  test.each([
    ['the account is the signer itself', { Account: MOCKED_ADDRESS }],
    ['SigningPubKey is set', { SigningPubKey: '02ABCDEF' }],
    ['it already has a TxnSignature', { TxnSignature: 'AB' }],
    ['it already has Signers', { Signers: [] }],
    ['Fee is missing', { Fee: undefined }],
    ['Sequence is missing', { Sequence: undefined }],
  ])('should throw InvalidParamsError when %s', async (_case, override) => {
    const prompt = jest.spyOn(TransactionDialog, 'prompt');

    await expect(handler.handle('https://origin', { ...txParams, ...override })).rejects.toThrow(InvalidParamsError);
    expect(prompt).not.toHaveBeenCalled();
    expect(walletMock.sign).not.toHaveBeenCalled();
  });

  test('should throw InvalidParamsError when transaction validation fails', async () => {
    await expect(handler.handle('https://origin', { ...txParams, TransactionType: 'invalid' } as any)).rejects.toThrow(InvalidParamsError);
  });

  test('should throw UserRejectedRequestError when user rejects the transaction', async () => {
    jest.spyOn(TransactionDialog, 'prompt').mockResolvedValue(false);

    await expect(handler.handle('https://origin', txParams)).rejects.toThrow(UserRejectedRequestError);
    expect(walletMock.sign).not.toHaveBeenCalled();
  });
});
