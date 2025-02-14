import RepositoryFactory from 'domain/adapter/RepositoryFactory';
import { useEffect, useRef, useState } from 'react';
import ControllerFactory from 'ui/adapter/ControllerFactory';

export function useLoad(): boolean {
  const [loading, setLoading] = useState(true);
  const isInitializing = useRef(false); // Avoid initializing 2 times

  useEffect(() => {
    if (isInitializing.current) {
      return;
    }
    isInitializing.current = true;
    async function startUseLoad() {
      try {
        await RepositoryFactory.init();
        await ControllerFactory.init();
        // Initialize wallet state
        await ControllerFactory.walletController.loadWallet();
        isInitializing.current = false;
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize:', error);
        isInitializing.current = false;
        setLoading(false);
      }
    }

    startUseLoad();
  }, []);

  return loading;
}
