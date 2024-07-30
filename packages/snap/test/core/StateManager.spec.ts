import type { State, Network } from '../../src/core/StateManager';
import { StateManager, DEFAULT_NETWORKS, DEFAULT_STATE } from '../../src/core/StateManager';
import { MOCKED_STATE } from '../__mocks__/core/StateManager.mock';

describe('StateManager', () => {
  let stateManager: StateManager;

  beforeEach(() => {
    stateManager = new StateManager();
    jest.clearAllMocks();
  });

  describe('get', () => {
    test('should return the current state if it is already set', async () => {
      stateManager.currentState = MOCKED_STATE;

      const state = await stateManager.get();

      expect(state).toEqual(MOCKED_STATE);
      expect(snap.request).not.toHaveBeenCalled(); // Should not try to get the state from the state from the snap
    });

    test('should return the default state if no stored state is found', async () => {
      stateManager.currentState = undefined;
      jest.spyOn(snap, 'request').mockResolvedValue(null);

      const state = await stateManager.get();

      expect(state).toEqual(DEFAULT_STATE);
    });

    test('should return the stored state if it exists', async () => {
      const storedState: State = {
        networks: DEFAULT_NETWORKS,
        activeNetwork: DEFAULT_NETWORKS[1] as Network,
      };
      jest.spyOn(snap, 'request').mockResolvedValue(storedState);

      const state = await stateManager.get();

      expect(state).toEqual(storedState);
      expect(stateManager.currentState).toEqual(storedState);
    });
  });

  describe('set', () => {
    test('should update the state', async () => {
      const newState: Partial<State> = {
        activeNetwork: DEFAULT_NETWORKS[2],
      };

      stateManager.currentState = MOCKED_STATE;
      jest.spyOn(snap, 'request').mockResolvedValue(null);

      await stateManager.set(newState);

      expect(snap.request).toHaveBeenCalledWith({
        method: 'snap_manageState',
        params: {
          operation: 'update',
          newState: {
            ...MOCKED_STATE,
            ...newState,
          },
        },
      });
    });

    test('should merge the new state with the existing state', async () => {
      const newState: Partial<State> = {
        activeNetwork: DEFAULT_NETWORKS[2],
      };

      const existingState: State = {
        networks: DEFAULT_NETWORKS,
        activeNetwork: DEFAULT_NETWORKS[1] as Network,
      };

      stateManager.currentState = existingState;
      jest.spyOn(snap, 'request').mockResolvedValue(null);

      await stateManager.set(newState);

      expect(snap.request).toHaveBeenCalledWith({
        method: 'snap_manageState',
        params: {
          operation: 'update',
          newState: {
            ...existingState,
            ...newState,
          },
        },
      });
    });
  });
});
