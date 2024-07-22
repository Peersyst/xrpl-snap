import {
  bip44PrivateKeyToXRPPrivateKey,
  bip44CompressedPublicKeyToXRPPublicKey,
  removeHexPreffix,
} from '../../src/core/utils/wallet-utils';

describe('Wallet utils Functions', () => {
  test('bip44PrivateKeyToXRPPrivateKey should convert a BIP44 private key to an XRP private key', () => {
    const privateKey = '0xabcdef';
    const expected = '00ABCDEF';
    expect(bip44PrivateKeyToXRPPrivateKey(privateKey)).toBe(expected);
  });

  test('bip44CompressedPublicKeyToXRPPublicKey should convert a BIP44 compressed public key to an XRP public key', () => {
    const compressedPublicKey = '0x123456';
    const expected = '123456';
    expect(bip44CompressedPublicKeyToXRPPublicKey(compressedPublicKey)).toBe(expected);
  });

  test('removeHexPreffix should remove the hex prefix if present', () => {
    const hexStringWithPrefix = '0xabcdef';
    const hexStringWithoutPrefix = 'abcdef';
    expect(removeHexPreffix(hexStringWithPrefix)).toBe(hexStringWithoutPrefix);
    expect(removeHexPreffix(hexStringWithoutPrefix)).toBe(hexStringWithoutPrefix);
  });
});
