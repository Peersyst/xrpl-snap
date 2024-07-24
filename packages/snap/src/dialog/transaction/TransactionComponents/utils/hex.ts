import { stringToHex as convertStringToHex, hexToString as convertHexToString } from '@xrplf/isomorphic/utils';

function isHex(text: string): boolean {
  return /^[0-9A-Fa-f]*$/u.test(text);
}

export { isHex, convertStringToHex, convertHexToString };
