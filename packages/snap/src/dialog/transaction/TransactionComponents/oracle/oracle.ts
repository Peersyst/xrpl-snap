import { type Component, text } from '@metamask/snaps-sdk';
import type { PriceData } from 'xrpl';

import { translate } from '../../../locale/translate';
import { Label, TransactionField } from '../base/base';
import { XrplTimeComponent } from '../common/common';
import { isNumber, isString } from '../utils/data-types-validator';

const OracleDocumentIDComponent = (oracleDocumentId: number | undefined): Component[] => {
  if (!isNumber(oracleDocumentId)) {
    return [];
  }
  return TransactionField('OracleDocumentID', String(oracleDocumentId));
};

const LastUpdateTimeComponent = (lastUpdateTime: number | undefined): Component[] => {
  if (!isNumber(lastUpdateTime)) {
    return [];
  }
  return XrplTimeComponent('LastUpdateTime', lastUpdateTime);
};

const BaseAssetComponent = (baseAsset: string | undefined): Component[] => {
  if (!isString(baseAsset)) {
    return [];
  }
  return TransactionField('BaseAsset', baseAsset);
};

const QuoteAssetComponent = (quoteAsset: string | undefined): Component[] => {
  if (!isString(quoteAsset)) {
    return [];
  }
  return TransactionField('QuoteAsset', quoteAsset);
};

const AssetPriceComponent = (assetPrice: number | string | undefined): Component[] => {
  if (!isNumber(assetPrice)) {
    return [];
  }
  return TransactionField('AssetPrice', String(assetPrice));
};

const ScaleComponent = (scale: number | undefined): Component[] => {
  if (!isNumber(scale)) {
    return [];
  }
  return TransactionField('Scale', String(scale));
};

const PriceDataComponent = (priceData: PriceData | undefined): Component[] => {
  if (!priceData?.PriceData) {
    return [];
  }
  return [
    ...BaseAssetComponent(priceData.PriceData.BaseAsset),
    ...QuoteAssetComponent(priceData.PriceData.QuoteAsset),
    ...AssetPriceComponent(priceData.PriceData.AssetPrice),
    ...ScaleComponent(priceData.PriceData.Scale),
  ];
};

const PriceDataSeriesComponment = (priceDataSeries: PriceData[] | undefined): Component[] => {
  const component: Component[] = [];

  if (priceDataSeries && priceDataSeries.length === 0) {
    component.push(Label('PriceData'));
    for (const [index, priceData] of priceDataSeries.entries()) {
      component.push(text(`**${translate('PriceData')} ${index}**:`));
      component.push(...PriceDataComponent(priceData));
    }
  }

  return component;
};

const ProviderComponent = (provider: string | undefined): Component[] => {
  if (!isString(provider)) {
    return [];
  }
  return TransactionField('Provider', provider);
};

const AssetClassComponent = (assetClass: string | undefined): Component[] => {
  if (!isString(assetClass)) {
    return [];
  }
  return TransactionField('AssetClass', assetClass);
};

export {
  OracleDocumentIDComponent,
  BaseAssetComponent,
  QuoteAssetComponent,
  AssetPriceComponent,
  ScaleComponent,
  LastUpdateTimeComponent,
  PriceDataSeriesComponment,
  PriceDataComponent,
  ProviderComponent,
  AssetClassComponent,
};
