import { text } from '@metamask/snaps-sdk';
import type { AccountSet } from 'xrpl';

import { translate } from '../../../src/dialog/locale/translate';
import { TransactionDialog } from '../../../src/dialog/transaction/TransactionDialog';

describe('TransactionDialog', () => {
  const tx: AccountSet = {
    TransactionType: 'AccountSet',
    Account: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
    Fee: '30',
    Sequence: 5,
  };
  const notice = text(translate('SignForNotice', { account: tx.Account }));
  const { request } = (globalThis as any).snap;

  beforeEach(() => {
    request.mockReset().mockResolvedValue(true);
  });

  const shownContent = () => request.mock.calls[0][0].params.content.children;

  test('shows the multisigning notice when signing for another account', async () => {
    expect(await TransactionDialog.prompt('https://origin', tx, { signingFor: tx.Account })).toBe(true);
    expect(shownContent()).toContainEqual(notice);
  });

  test('does not show the notice for a normal signature', async () => {
    await TransactionDialog.prompt('https://origin', tx);
    expect(shownContent()).not.toContainEqual(notice);
  });
});
