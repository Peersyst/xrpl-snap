import type { OracleSet } from 'xrpl';

export const ORACLE_SET: OracleSet = {
  TransactionType: 'OracleSet',
  Account: 'rfmDuhDyLGgx94qiwf3YF8BUV5j6KSvE8',
  OracleDocumentID: 1234,
  LastUpdateTime: 768062172,
  PriceDataSeries: [
    {
      PriceData: {
        BaseAsset: 'XRP',
        QuoteAsset: 'USD',
        AssetPrice: 740,
        Scale: 3,
      },
    },
  ],
  Provider: '636861696e6c696e6b', // Hexadecimal for 'chainlink'
  URI: '6469645F6578616D706C65', // Already provided in hexadecimal
  AssetClass: '63757272656e6379', // Hexadecimal for 'currency'
};
