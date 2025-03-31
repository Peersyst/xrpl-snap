/**
 * Encryption utility for sensitive data in the XRPL Snap
 */
export class EncryptionManager {
  /**
   * Encrypts sensitive data using the snap's entropy as encryption key
   * @param data - The data to encrypt
   * @returns The encrypted data as a hex string
   */
  static async encryptData(data: string): Promise<string> {
    try {
      const entropy = await snap.request({
        method: 'snap_getEntropy',
        params: {
          version: 1,
        },
      });

      // Convert entropy to a proper key
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(entropy),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );

      const salt = crypto.getRandomValues(new Uint8Array(16));
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      );

      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encryptedContent = await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        key,
        encoder.encode(data)
      );

      // Combine salt, iv, and encrypted content
      const encryptedArray = new Uint8Array(salt.length + iv.length + encryptedContent.byteLength);
      encryptedArray.set(salt, 0);
      encryptedArray.set(iv, salt.length);
      encryptedArray.set(new Uint8Array(encryptedContent), salt.length + iv.length);

      // Convert to hex string
      const result = Array.from(encryptedArray)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Decrypts encrypted data using the snap's entropy as decryption key
   * @param encryptedHex - The encrypted data as a hex string
   * @returns The decrypted data
   */
  static async decryptData(encryptedHex: string): Promise<string> {
    try {
      const entropy = await snap.request({
        method: 'snap_getEntropy',
        params: {
          version: 1,
        },
      });

      // Convert hex string back to Uint8Array
      const encryptedArray = new Uint8Array(
        encryptedHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
      );

      // Extract salt, iv, and encrypted content
      const salt = encryptedArray.slice(0, 16);
      const iv = encryptedArray.slice(16, 28);
      const encryptedContent = encryptedArray.slice(28);

      // Recreate the key
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(entropy),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );

      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );

      const decryptedContent = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        key,
        encryptedContent
      );

      const result = new TextDecoder().decode(decryptedContent);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
