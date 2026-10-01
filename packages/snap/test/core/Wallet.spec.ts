import * as MetaMaskKeyTree from '@metamask/key-tree';
import type { BIP44AddressKeyDeriver } from '@metamask/key-tree';
import { verify } from 'ripple-keypairs';
import { decode, encodeForMultiSigning, type AccountSet, type Signer } from 'xrpl';

import { bip44CompressedPublicKeyToXRPPublicKey, bip44PrivateKeyToXRPPrivateKey } from '../../src/core/utils/wallet-utils';
import { Wallet } from '../../src/core/Wallet'; // adjust the path accordingly
import requests from '../fixtures/requests';
import responses from '../fixtures/responses';

describe('Wallet functions', () => {
  const mockXRPPrivateKey = 'B6FE8507D977E46E988A8A94DB3B8B35E404B60F8B11AC5213FA8B5ABC8A8D19';
  const mockXRPPublicKey = '03BFC2F7AE242C3493187FA0B72BE97B2DF71194FB772E507FF9DEA0AD13CA1625';
  const mockClassicAddress = 'rQKQsPeE3iTRyfUypLhuq74gZdcRdwWqDp';

  const mockBip44Node = {
    privateKey: mockXRPPrivateKey,
    compressedPublicKey: mockXRPPublicKey,
  };

  const mockedGetBIP44AddressKeyDeriver = jest.fn().mockResolvedValue(mockBip44Node) as unknown as BIP44AddressKeyDeriver;

  jest.spyOn(MetaMaskKeyTree, 'getBIP44AddressKeyDeriver').mockResolvedValue(mockedGetBIP44AddressKeyDeriver);

  describe('derive', () => {
    test('Creates wallet correctly', async () => {
      const wallet = await Wallet.derive(0);

      expect(wallet).toBeInstanceOf(Wallet);
      expect(wallet.privateKey).toBe(bip44PrivateKeyToXRPPrivateKey(mockXRPPrivateKey));
      expect(wallet.publicKey).toBe(bip44CompressedPublicKeyToXRPPublicKey(mockXRPPublicKey));
      expect(wallet.address).toBe(mockClassicAddress);
    });
  });

  describe('sign', () => {
    let wallet: Wallet;

    beforeEach(async () => {
      wallet = await Wallet.derive(0);
    });

    test('Signs transaction correctly', () => {
      const normalTxRequest = requests.sign.normal;

      const signedTx = wallet.sign(normalTxRequest);

      expect(signedTx.tx_blob).toBe(responses.sign.normal.signedTransaction);
    });

    test('Produces a multisignature contribution when multisign is true', () => {
      const multisigAccount = 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe';
      const tx: AccountSet = {
        TransactionType: 'AccountSet',
        Account: multisigAccount,
        Fee: '40',
        Sequence: 0,
        TicketSequence: 7,
        SigningPubKey: '',
      };

      const { tx_blob: blob } = wallet.sign(tx, true);
      const decoded = decode(blob) as unknown as AccountSet & { Signers: Signer[] };

      expect(decoded.Account).toBe(multisigAccount);
      expect(decoded.SigningPubKey).toBe('');
      expect(decoded.TxnSignature).toBeUndefined();
      expect(decoded.Signers).toHaveLength(1);
      const signer = decoded.Signers[0]?.Signer;
      expect(signer?.Account).toBe(wallet.address);
      expect(signer?.SigningPubKey).toBe(wallet.publicKey);
      expect(verify(encodeForMultiSigning(tx, wallet.address), signer?.TxnSignature ?? '', wallet.publicKey)).toBe(true);
    });

    test('Signs message correctly', () => {
      const signedMessage = wallet.signMessage('1234');

      expect(isHex(signedMessage)).toBe(true);
    });
  });
});

function isHex(str: string): boolean {
  return /^[A-F0-9]+$/iu.test(str);
}
