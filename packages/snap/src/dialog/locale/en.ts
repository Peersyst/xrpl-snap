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
  ExtractFamilySeedHeader: 'XRPL Account Family Seeed',

  ExtractFamilySeedRequestHeader: 'Do you want to export your Family Seeed?',
  ExtractFamilySeedRequestBodyStepTitle1: 'Understand the Risk',
  ExtractFamilySeedRequestBodyStepExplanation1:
    '⚠️ **Warning**: Never disclose this key. Anyone with your family seed can steal any assets held in your account.',
  ExtractFamilySeedRequestBodyStepTitle2: 'Be Aware of Irreversibility',
  ExtractFamilySeedRequestBodyStepExplanation2:
    '⚠️ **Warning**: If you lose your family seed, nobody can help you, neither the XRPL Snap or the Metamask team.',
  ExtractFamilySeedRequestBodyStepTitle3: 'Protect Yourself from Scams',
  ExtractFamilySeedRequestBodyStepExplanation3:
    '⚠️ **Warning**: If anyone, even a support agent, asks for your Secret Recovery Phrase, you are being scammed.',
};
