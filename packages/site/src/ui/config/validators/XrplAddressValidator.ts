import type { TranslateFn } from '@peersyst/react-components';
import { BaseValidator } from '@peersyst/react-components-core';
import { isValidAddress } from 'xrpl';

export default class XrplAddressValidator extends BaseValidator {
  constructor(message: string | undefined, translate: TranslateFn) {
    super(message || translate('invalidAddress', { chain: 'xrp' }));
  }

  validate(value: string): boolean {
    return isValidAddress(value);
  }
}
