import { divider, heading, panel, text } from '@metamask/snaps-sdk';

import type { Network } from '../../../src/core/StateManager';
import { translate } from '../../../src/dialog/locale/translate';
import { ChangeNetworkDialog } from '../../../src/dialog/network/ChangeNetworkDialog';

describe('ChangeNetworkDialog', () => {
  const origin = 'mockOrigin';
  const network: Network = { nodeUrl: 'mockNodeUrl', chainId: 1, name: 'mockName', explorerUrl: 'mockExplorerUrl' };
  const headerResult = [heading(translate('ChangeNetworkHeader')), text(translate('ChangeNetworkSubHeader', { origin }))];
  const bodyResult = [
    text(translate('ChangeNetworkNode', { node: network.nodeUrl })),
    text(translate('ChangeNetworkChainId', { chainId: network.chainId.toString() })),
  ];

  describe('BuildHeader', () => {
    test('Builds header correctly', () => {
      const result = ChangeNetworkDialog.buildHeader(origin);

      expect(result).toEqual(headerResult);
    });
  });

  describe('BuildBody', () => {
    test('Builds body correctly', () => {
      const result = ChangeNetworkDialog.buildBody(network);

      expect(result).toEqual(bodyResult);
    });
  });

  describe('Prompt', () => {
    test('Prompts correctly', async () => {
      const mockedRequest = jest.fn().mockResolvedValue(true);
      jest.spyOn(snap, 'request').mockImplementation(mockedRequest);

      const result = await ChangeNetworkDialog.prompt(origin, network);

      expect(mockedRequest).toHaveBeenCalledWith({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([...headerResult, divider(), ...bodyResult]),
        },
      });
      expect(result).toBe(true);
    });

    test('Prompts correctly with false result', async () => {
      const mockedRequest = jest.fn().mockResolvedValue(false);
      jest.spyOn(snap, 'request').mockImplementation(mockedRequest);

      const result = await ChangeNetworkDialog.prompt(origin, network);

      expect(result).toBe(false);
    });
  });
});
