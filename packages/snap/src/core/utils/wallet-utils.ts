export function bip44PrivateKeyToXRPPrivateKey(privateKey: string): string {
  return `00${removeHexPreffix(privateKey).toUpperCase()}`;
}

export function bip44CompressedPublicKeyToXRPPublicKey(compressedPublicKey: string): string {
  return removeHexPreffix(compressedPublicKey).toUpperCase();
}

export function removeHexPreffix(hexString: string): string {
  if (hexString.startsWith('0x')) {
    return hexString.slice(2);
  }
  return hexString;
}
