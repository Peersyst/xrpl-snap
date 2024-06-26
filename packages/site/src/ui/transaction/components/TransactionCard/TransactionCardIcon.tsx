import { Skeleton } from '@peersyst/react-components';
import { alpha } from '@peersyst/react-utils';
import clsx from 'clsx';
import { ACCOUNT_TX_TYPES, AMM_TX_TYPES, DEX_TX_TYPES, NFT_TX_TYPES, PAYMENT_TX_TYPES } from 'common/models/transaction/tx.types';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import ChipIconButton from 'ui/common/components/input/ChipIconButton/ChipIconButton';
import { AccountIcon, AMMIcon, ContractIcon, DEXIcon, NFTIcon, ArrowInIcon, ArrowOutIcon } from 'ui/common/icons';
import { Transaction } from 'xrpl';

export interface TransactionCardIconProps {
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  txType: Transaction['TransactionType'];
  isReceiver: boolean;
}

const ReceivedIcon = styled(ArrowInIcon)(
  ({ theme }) => css`
    path:nth-child(2) {
      fill: ${theme.palette.white} !important;
    }
  `,
);

function getTransactionIcon(type: Transaction['TransactionType'], isReceiver: boolean) {
  if (AMM_TX_TYPES.includes(type)) {
    return AMMIcon;
  } else if (NFT_TX_TYPES.includes(type)) {
    return NFTIcon;
  } else if (DEX_TX_TYPES.includes(type)) {
    return DEXIcon;
  } else if (PAYMENT_TX_TYPES.includes(type)) {
    return isReceiver ? ReceivedIcon : ArrowOutIcon;
  } else if (ACCOUNT_TX_TYPES.includes(type)) {
    return AccountIcon;
  }
  return ContractIcon;
}

const TransactionCardIconRoot = styled(ChipIconButton)(
  ({ theme }) => css`
    .ChipLabel.ChipLabel.ChipLabel {
      font-size: 1.25rem;
    }
    &.Active.Active.Active {
      background-color: ${alpha(theme.palette.primary, 0.08)};
      border: none;
      .Icon {
        color: ${theme.palette.primary};
        &:second-child {
          color: ${theme.palette.white};
        }
      }
    }
  `,
);

function TransactionCardIcon({ className, txType, isReceiver, loading, ...rest }: TransactionCardIconProps) {
  const Icon = useMemo(() => getTransactionIcon(txType, isReceiver), [txType, isReceiver]);
  return (
    <Skeleton loading={loading} shape="circular">
      <TransactionCardIconRoot
        size="lg"
        className={clsx('TransactionCardIcon', isReceiver ? 'Active' : '', className)}
        Icon={Icon}
        {...rest}
      />
    </Skeleton>
  );
}

export default TransactionCardIcon;
