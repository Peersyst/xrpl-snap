import { text, type Component } from '@metamask/snaps-sdk';
import type { AMMBid, AMMCreate, AMMDeposit, AMMWithdraw, Currency, IssuedCurrencyAmount } from 'xrpl';

import type { LocaleKey } from '../../../locale/translate';
import { AmountComponent, CompactIssuedCurrencyAmountComponent } from '../amount/amount';
import { Label, TransactionField, TransactionRow } from '../base/base';
import { formatIOUAmount } from '../utils';
import { isNumber } from '../utils/data-types-validator';

const AssetComponent = (asset: Currency, label: LocaleKey = 'Asset'): Component[] => {
  if (!asset) {
    return [];
  }
  if (asset.currency === 'XRP') {
    return TransactionRow(label, 'XRP');
  }
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return TransactionRow(label, `${asset.currency}.${asset.issuer}`);
};

const Asset2Component = (asset: Currency): Component[] => {
  if (!asset) {
    return [];
  }
  return AssetComponent(asset, 'Asset2');
};

const Amount2Component = (amount: AMMCreate['Amount2'] | undefined): Component[] => {
  if (!amount) {
    return [];
  }
  return AmountComponent(amount, 'Amount2');
};

const EPriceComponent = (amount: AMMDeposit['EPrice'] | undefined): Component[] => {
  if (!amount) {
    return [];
  }
  return AmountComponent(amount, 'EPrice');
};

const LPTokenOutComponent = (amount: AMMDeposit['LPTokenOut'] | undefined): Component[] => {
  if (!amount) {
    return [];
  }
  return CompactIssuedCurrencyAmountComponent(amount, 'LPTokenOut');
};

const LPTokenInComponent = (amount: AMMWithdraw['LPTokenIn'] | undefined): Component[] => {
  if (!amount) {
    return [];
  }
  return CompactIssuedCurrencyAmountComponent(amount, 'LPTokenIn');
};

const BidAmount = (label: LocaleKey, bidAmount: IssuedCurrencyAmount): Component[] => {
  if (!bidAmount) {
    return [];
  }
  return TransactionField(label, `${formatIOUAmount(bidAmount)}.${bidAmount.issuer}`);
};

const BidMinComponent = (bidMin: AMMBid['BidMin']): Component[] => {
  if (!bidMin) {
    return [];
  }
  return BidAmount('BidMin', bidMin);
};

const BidMaxComponent = (bidMax: AMMBid['BidMax']): Component[] => {
  if (!bidMax) {
    return [];
  }
  return BidAmount('BidMax', bidMax);
};

const AuthAccountsComponent = (authAccounts: AMMBid['AuthAccounts']): Component[] => {
  if (!authAccounts || authAccounts.length === 0) {
    return [];
  }
  const children = authAccounts.map(({ AuthAccount: { Account } }) => text(Account));
  return [Label('AuthAccounts'), ...children];
};

const TradingFeeComponent = (tradingFee: AMMCreate['TradingFee']): Component[] => {
  if (!isNumber(tradingFee)) {
    return [];
  }
  const parsedFee = Number(tradingFee) / 1000;
  return TransactionField('TradingFee', `${parsedFee} (${parsedFee}%)`);
};

export {
  Asset2Component,
  AssetComponent,
  BidMinComponent,
  BidMaxComponent,
  AuthAccountsComponent,
  Amount2Component,
  TradingFeeComponent,
  EPriceComponent,
  LPTokenOutComponent,
  LPTokenInComponent,
};
