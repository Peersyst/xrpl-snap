import { base32 } from 'multiformats/bases/base32';
import { CID } from 'multiformats/cid';

/**
 * Converts an IPFS URI to a gateway URL.
 * @param ipfsUri - The IPFS URI to convert.
 * @returns The corresponding gateway URL.
 */
export function convertIpfsToGateway(ipfsUri: string): string {
  const cleanedUri = ipfsUri.replace(/^ipfs:\/\/(ipfs\/)?/, '');
  // eslint-disable-next-line prefer-const
  let [cid, ...filePath] = cleanedUri.split('/');

  // Convert CIDv0 to CIDv1 if necessary
  if (cid.startsWith('Qm')) {
    const cidv0 = CID.parse(cid); // Parse CIDv0
    cid = cidv0.toV1().toString(base32); // Convert to CIDv1 and encode in base32
  }

  return `https://${cid}.ipfs.dweb.link/${filePath.join('/')}`;
}
