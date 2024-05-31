import { Select } from '@peersyst/react-components';
import clsx from 'clsx';
import useGetNetworkSelectOptions from './hooks/useGetNetworkSelectOptions';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';
import { useTranslate } from 'ui/locale';

export interface NetworkSelectProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function NetworkSelect({ className, children, ...rest }: NetworkSelectProps) {
  const translate = useTranslate();
  const options = useGetNetworkSelectOptions();
  const { data: activeNetwork, isLoading } = useGetActiveNetwork();

  return (
    <Select
      css={{ width: '8.5rem' }}
      disabled={options.length === 0}
      defaultValue={activeNetwork?.chainId}
      key={activeNetwork?.chainId}
      placeholder={translate(isLoading ? 'loading' : 'selectYourNetwork')}
      options={options}
      className={clsx('NetworkSelect', className)}
      {...rest}
    />
  );
}

export default NetworkSelect;
