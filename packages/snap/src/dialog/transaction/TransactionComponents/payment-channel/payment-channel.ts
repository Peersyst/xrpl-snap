import type { Component } from '@metamask/snaps-sdk';
import type { PaymentChannelClaim, PaymentChannelCreate } from 'xrpl';

import { AmountComponent } from '../amount/amount';
import { TransactionField } from '../base/base';
import { isNumber, isString } from '../utils/data-types-validator';

const ChannelComponent = (channel: PaymentChannelClaim['Channel'] | undefined): Component[] => {
  if (!isString(channel)) {
    return [];
  }
  return TransactionField('Channel', channel);
};

const BalanceComponent = (balance: PaymentChannelClaim['Balance'] | undefined): Component[] => {
  if (!isString(balance)) {
    return [];
  }
  return AmountComponent(balance, 'Balance');
};

const SignatureComponent = (signature: PaymentChannelClaim['Signature'] | undefined): Component[] => {
  if (!isString(signature)) {
    return [];
  }
  return TransactionField('Signature', signature);
};

const PublicKeyComponent = (publicKey: PaymentChannelClaim['PublicKey'] | undefined): Component[] => {
  if (!isString(publicKey)) {
    return [];
  }
  return TransactionField('PublicKey', publicKey);
};

const SettleDelayComponent = (settleDelay: PaymentChannelCreate['SettleDelay'] | undefined): Component[] => {
  if (!isNumber(settleDelay)) {
    return [];
  }
  // TODO(jordi): Improve settleDelay display
  return TransactionField('SettleDelay', String(settleDelay));
};

export { ChannelComponent, BalanceComponent, SignatureComponent, PublicKeyComponent, SettleDelayComponent };
