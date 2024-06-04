import { Select } from '@peersyst/react-components';
import clsx from 'clsx';
import useGetNetworkSelectOptions from './hooks/useGetNetworkSelectOptions';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { useTranslate } from 'ui/locale';
import useChangeNetwork from 'ui/network/query/useChangeNetwork';
import useGetStoredNetworks from 'ui/network/query/useGetStoredNetworks';

export interface NetworkSelectProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function NetworkSelect({ className, children, ...rest }: NetworkSelectProps) {
  const translate = useTranslate();
  const { data: networks = [], isFetching } = useGetStoredNetworks();
  const options = useGetNetworkSelectOptions();
  const { data: activeNetwork, isLoading } = useGetActiveNetwork();
  const { mutate } = useChangeNetwork();

  const loading = isFetching || isLoading;

  return (
    <Select
      css={{ width: '8,75rem' }}
      onChange={(chainId) => {
        const network = networks.find((option) => option.chainId === chainId);
        if (network && network.chainId !== activeNetwork?.chainId)
          mutate(network);
      }}
      value={activeNetwork?.chainId}
      disabled={options.length === 0}
      defaultValue={activeNetwork?.chainId}
      placeholder={translate(loading ? 'loading' : 'selectYourNetwork')}
      options={options}
      className={clsx('NetworkSelect', className)}
      {...rest}
    />
  );
}

export default NetworkSelect;
