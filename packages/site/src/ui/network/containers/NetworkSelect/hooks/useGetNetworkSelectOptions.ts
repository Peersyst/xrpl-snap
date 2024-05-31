import { SelectOption } from '@peersyst/react-components';
import { Network } from 'common/models/network/network.types';
import { useMemo } from 'react';
import useGetStoredNetworks from 'ui/network/query/useGetStoredNetworks';

export default function useGetNetworkSelectOptions() {
  const { data: networks = [] } = useGetStoredNetworks();

  const options: SelectOption<Network>[] = useMemo(() => {
    return networks.map((network) => ({
      value: network,
      label: network.name,
    }));
  }, [networks]);

  return options;
}
