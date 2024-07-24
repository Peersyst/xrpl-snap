import type { Component } from '@metamask/snaps-sdk';
import { text } from '@metamask/snaps-sdk';
import type { Memo } from 'xrpl';

import { TransactionRow } from '../base/base';
import { convertHexToString, isHex } from '../utils/hex';

const MemoComponent = (memo: Memo): Component[] => {
  const memoComponents: Component[] = [];
  const { MemoData, MemoFormat, MemoType } = memo.Memo;
  if (MemoData && isHex(MemoData)) {
    memoComponents.push(...TransactionRow('MemoData', convertHexToString(MemoData)));
  }
  if (MemoType && isHex(MemoType)) {
    memoComponents.push(...TransactionRow('MemoType', convertHexToString(MemoType)));
  }
  if (MemoFormat && isHex(MemoFormat)) {
    memoComponents.push(...TransactionRow('MemoFormat', convertHexToString(MemoFormat)));
  }

  return memoComponents;
};

const MemosComponent = (memos: Memo[] | undefined): Component[] => {
  if (!memos || memos.length === 0) {
    return [];
  }

  const multipleMemos = memos.length > 1;

  return memos.map((memo, i) => [text(`**Memo ${multipleMemos ? i : ''}:**`), ...MemoComponent(memo)]).flat();
};

export { MemosComponent, MemoComponent };
