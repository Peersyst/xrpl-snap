import type { SelectOption } from '@peersyst/react-components';
import { useMemo } from 'react';
import useGetStoredNetworks from 'ui/network/query/useGetStoredNetworks';

export default function useGetNetworkSelectOptions() {
  const { data: networks = [] } = useGetStoredNetworks();

  const options: SelectOption<number>[] = useMemo(() => {
    return networks.map((network) => ({
      value: network.chainId,
      label: network.name,
    }));
  }, [networks]);

  return options;
}
