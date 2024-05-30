import RepositoryFactory from 'domain/adapter/RepositoryFactory';
import { useEffect, useState } from 'react';
import ControllerFactory from 'ui/adapter/ControllerFactory';

export function useLoad(): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function startUseLoad() {
      await RepositoryFactory.init();
      await ControllerFactory.init();
      setLoading(false);
    }
    startUseLoad();
  }, []);

  return loading;
}
