import { translate } from '../../utils/translate';
import { ExtractPrivateKeyRequestDialog } from '../../../src/dialog/account/ExtractPrivateKeyRequestDialog';
import { LocaleKey } from '../../../src/dialog/locale/translate';
import { heading, text } from '@metamask/snaps-sdk';

describe('ExtractPrivateKeyRequestDialog', () => {
  const headerResult = [heading(translate('ExtractPrivateKeyRequestHeader'))];

  const bodyResult = Array.from({ length: 3 }, (_, i) => [
    heading(translate(`ExtractPrivateKeyRequestBodyStepTitle${i + 1}` as LocaleKey)),
    text(translate(`ExtractPrivateKeyRequestBodyStepExplanation${i + 1}` as LocaleKey)),
  ]).flat();

  describe('BuildHeader', () => {
    test('Builds header correctly', () => {
      const result = ExtractPrivateKeyRequestDialog.buildHeader();

      expect(result).toEqual(headerResult);
    });
  });

  describe('BuildBody', () => {
    test('Builds body correctly', () => {
      const result = ExtractPrivateKeyRequestDialog.buildBody();

      expect(result).toEqual(bodyResult);
    });
  });

  describe('Prompt', () => {
    test('Prompts correctly', async () => {
      const mockedRequest = jest.fn();
      jest.spyOn(snap, 'request').mockImplementation(mockedRequest);

      await ExtractPrivateKeyRequestDialog.prompt();

      expect(mockedRequest).toHaveBeenCalledWith({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: { type: 'panel', children: [...headerResult, { type: 'divider' }, ...bodyResult] },
        },
      });
    });
  });
});
