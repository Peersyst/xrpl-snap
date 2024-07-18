import { divider, heading, panel, text } from '@metamask/snaps-sdk';
import { SignMessageDialog } from '../../../src/dialog/transaction/SignMessageDialog';
import { translate } from '../../../src/dialog/locale/translate';

describe('SignMessageDialog', () => {
  const origin = 'mockOrigin';
  const message = 'mockMessage';
  const headerResult = [heading(translate('SignMessageHeader')), text(translate('SignMessageSubHeader', { origin }))];
  const bodyResult = [text(translate('SignMessage', { message }))];
  const footerResult = [text(translate('SignMessageFooter'))];

  describe('BuildHeader', () => {
    test('Builds header correctly', () => {
      const result = SignMessageDialog.buildHeader(origin);

      expect(result).toEqual(headerResult);
    });
  });

  describe('BuildBody', () => {
    test('Builds body correctly', () => {
      const result = SignMessageDialog.buildBody(message);

      expect(result).toEqual(bodyResult);
    });
  });

  describe('BuildFooter', () => {
    test('Builds footer correctly', () => {
      const result = SignMessageDialog.buildFooter();

      expect(result).toEqual(footerResult);
    });
  });

  describe('Prompt', () => {
    test('Prompts correctly with true result', async () => {
      const mockedRequest = jest.fn().mockResolvedValue(true);
      jest.spyOn(snap, 'request').mockImplementation(mockedRequest);

      const result = await SignMessageDialog.prompt(origin, message);

      expect(mockedRequest).toHaveBeenCalledWith({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([...headerResult, divider(), ...bodyResult, divider(), ...footerResult]),
        },
      });
      expect(result).toBe(true);
    });

    test('Prompts correctly with false result', async () => {
      const mockedRequest = jest.fn().mockResolvedValue(false);
      jest.spyOn(snap, 'request').mockImplementation(mockedRequest);

      const result = await SignMessageDialog.prompt(origin, message);

      expect(mockedRequest).toHaveBeenCalledWith({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([...headerResult, divider(), ...bodyResult, divider(), ...footerResult]),
        },
      });
      expect(result).toBe(false);
    });
  });
});
