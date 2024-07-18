// eslint-disable-next-line import/no-anonymous-default-export
export default {
  /**
   * Transaction dialog
   */
  TransactionHeader: 'Sign XRPL Transaction',
  TransactionSubHeader: 'Got a request from %origin% to sign the following transaction',
  TransactionFooter: '⚠️ Please check that all of the above fields are correct.',
  // Transaction fields
  TransactionType: 'TransctionType',
  Account: 'Account',
  Destination: 'Destination',
  DestinationTag: 'Destination Tag',
  InvoiceID: 'Invoice ID',
  Amount: 'Amount',
  Issuer: 'Issuer',
  Fee: 'Fee',
  ClearFlag: 'Clear Flag',
  Domain: 'Domain',
  EmailHash: 'Email Hash',
  MessageKey: 'Message Key',
  TickSize: 'Tick Size',
  TransferRate: 'Transfer Rate',
  NFTokenMinter: 'NFToken Minter',
  Asset: 'Asset',
  Asset2: 'Asset 2',
  BidMin: 'Bid Min',
  BidMax: 'Bid Max',
  AuthAccounts: 'Auth Accounts',
  Amount2: 'Amount 2',
  TradingFee: 'Trading Fee',
  EPrice: 'Effective price',
  LPTokenOut: `AMM's LP Tokens to buy`,
  LPTokenIn: `AMM's LP Tokens to redeem`,
  CheckID: 'Check ID',
  DeliverMin: 'Deliver Min',
  SendMax: 'Send Max',
  Expiration: 'Expiration',
  Data: 'Data',
  URI: 'URI',
  DIDDocument: 'DID Document',
  Authorize: 'Authorize',
  Unauthorize: 'Unauthorize',
  Channel: 'Channel',
  Balance: 'Balance',
  Signature: 'Signature',
  PublicKey: 'Public Key',
  CancelAfter: 'Cancel After',
  SettleDelay: 'Settle Delay',
  OfferSequence: 'Offer Sequence',
  Owner: 'Owner',
  FinishAfter: 'Finish After',
  Condition: 'Condition',
  Fulfillment: 'Fulfillment',
  TakerPays: 'Taker Pays',
  TakerGets: 'Taker Gets',
  NFTokenSellOffer: 'NFToken Sell Offer',
  NFTokenBuyOffer: 'NFToken Buy Offer',
  NFTokenBrokerFee: 'NFToken Broker Fee',
  NFTokenID: 'NFToken ID',
  NFTokenOffers: 'NFToken Offers',
  NFTokenTaxon: 'NFToken Taxon',
  TransferFee: 'Transfer Fee',
  LimitAmount: 'Limit Amount',
  QualityIn: 'Quality In',
  QualityOut: 'Quality Out',
  TicketCount: 'Ticket Count',
  RegularKey: 'Regular Key',
  SignerQuorum: 'Signer Quorum',
  SignerEntries: 'Signer Entries',
  SignerEntry: 'Signer Entry',
  SignerWeight: 'Signer Weight',
  /**
   * Sign Message dialogs
   */
  SignMessageHeader: 'Sign Message',
  SignMessageSubHeader: 'Got a request from %origin% to sign the following message',
  SignMessage: '**Message:** %message%',
  SignMessageFooter: '**Signing of a message can be dangerous.**',
  /**
   * Network dialogs
   */
  ChangeNetworkHeader: 'Change Network',
  ChangeNetworkSubHeader: 'Got a request from %origin% to change the network',
  ChangeNetworkChainId: '**Chain ID:** %chainId%',
  ChangeNetworkNode: '**Node:** %node%',
  /**
   * Account dialogs
   */
  ExtractPrivateKeyHeader: 'XRPL Account Private Key',
  ExtractPrivateKeyRequestHeader: 'Do you want to export your Private Key ?',
  ExtractPrivateKeyRequestBodyStepTitle1: '⚠️ Warning: Understand the Risk',
  ExtractPrivateKeyRequestBodyStepExplanation1:
    'Never disclose this key. Anyone with your private key can steal any assets held in your account.',
  ExtractPrivateKeyRequestBodyStepTitle2: '⚠️ Warning: Be Aware of Irreversibility',
  ExtractPrivateKeyRequestBodyStepExplanation2:
    'If you lose your private key, nobody can help you, neither the XRPL Snap or the Metamask team.',
  ExtractPrivateKeyRequestBodyStepTitle3: '⚠️ Warning: Protect Yourself from Scams',
  ExtractPrivateKeyRequestBodyStepExplanation3: 'If anyone, even a support agent, asks for your private key, you are being scammed.',
};
