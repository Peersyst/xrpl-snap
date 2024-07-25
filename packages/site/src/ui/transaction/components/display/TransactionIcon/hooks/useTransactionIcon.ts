import { ACCOUNT_TX_TYPES, AMM_TX_TYPES, DEX_TX_TYPES, NFT_TX_TYPES, PAYMENT_TX_TYPES } from 'common/models/transaction/tx.types';
import { useMemo } from 'react';
import { AccountIcon, AMMIcon, ContractIcon, DEXIcon, NFTIcon, ArrowOutIcon } from 'ui/common/icons';
import { Transaction } from 'xrpl';

import { ReceivedIcon } from '../TransactionIcon.styles';

function getTransactionIcon(type: Transaction['TransactionType'], isReceiver: boolean) {
  switch (true) {
    case AMM_TX_TYPES.includes(type):
      return AMMIcon;
    case NFT_TX_TYPES.includes(type):
      return NFTIcon;
    case DEX_TX_TYPES.includes(type):
      return DEXIcon;
    case PAYMENT_TX_TYPES.includes(type):
      return isReceiver ? ReceivedIcon : ArrowOutIcon;
    case ACCOUNT_TX_TYPES.includes(type):
      return AccountIcon;
    default:
      return ContractIcon;
  }
}

export default function useTransactionIcon(txType: Transaction['TransactionType'], isReceiver: boolean): typeof AMMIcon {
  return useMemo(() => getTransactionIcon(txType, isReceiver), [txType, isReceiver]);
}
