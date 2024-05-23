// eslint-disable-next-line import/no-anonymous-default-export
export default {
  /**
   * Transaction dialog
   */
  TransactionHeader: 'Sign XRPL Transaction',
  TransactionSubHeader:
    'Got a request from %origin% to sign the following transaction',
  TransactionFooter:
    '**Please check that all of the above fields are correct.**',
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
};
