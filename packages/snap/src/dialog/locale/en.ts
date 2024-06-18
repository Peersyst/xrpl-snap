// eslint-disable-next-line import/no-anonymous-default-export
export default {
  /**
   * Transaction dialog
   */
  TransactionHeader: 'Sign XRPL Transaction',
  TransactionSubHeader: 'Got a request from %origin% to sign the following transaction',
  TransactionFooter: '**Please check that all of the above fields are correct.**',
  // Transaction fields
  TransactionType: '`**TransctionType:** %0%',
  Account: '`**Account:** %0%',
  Destination: '`**Destination:** %0%',
  Amount: '`**Amount:** %0%',
  /**
   * Message dialogs
   */
  MessageHeader: 'Sign Message',
  MessageSubHeader: 'Got a request from %origin% to sign the following message',
  Message: '**Message:** %message%',
  MessageFooter: '**Signing of a message can be dangerous.**',
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
