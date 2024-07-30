import type { Network, State } from '../../../src/core/StateManager';
import { DEFAULT_NETWORKS } from '../../../src/core/StateManager';

export const MOCKED_STATE: State = {
  networks: DEFAULT_NETWORKS,
  activeNetwork: DEFAULT_NETWORKS[0] as Network,
};

export class StateManagerMock {
  set = jest.fn();

  get = jest.fn().mockReturnValue(MOCKED_STATE);
}
