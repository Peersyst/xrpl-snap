import { copyable, divider, heading, panel } from '@metamask/snaps-sdk';
import { ExtractPrivateKeyDialog } from '../../../src/dialog/account/ExtractPrivateKeyDialog';
import { translate } from '../../../src/dialog/locale/translate';

describe('ExtractPrivateKeyDialog', () => {
  const privateKey = 'mockPrivateKey';
  const headerResult = [heading(translate('ExtractPrivateKeyHeader'))];
  const bodyResult = [copyable(privateKey)];

  describe('BuildHeader', () => {
    test('Builds header correctly', () => {
      const result = ExtractPrivateKeyDialog.buildHeader();

      expect(result).toEqual(headerResult);
    });
  });

  describe('BuildBody', () => {
    test('Builds body correctly', () => {
      const result = ExtractPrivateKeyDialog.buildBody(privateKey);

      expect(result).toEqual(bodyResult);
    });
  });

  describe('Prompt', () => {
    test('Prompts correctly', async () => {
      const mockedRequest = jest.fn();
      jest.spyOn(snap, 'request').mockImplementation(mockedRequest);

      await ExtractPrivateKeyDialog.prompt(privateKey);

      expect(mockedRequest).toHaveBeenCalledWith({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([...headerResult, divider(), ...bodyResult]),
        },
      });
    });
  });
});
