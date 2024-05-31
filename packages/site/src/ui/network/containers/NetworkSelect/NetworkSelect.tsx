import { Select } from '@peersyst/react-components';
import clsx from 'clsx';
import useGetNetworkSelectOptions from './hooks/useGetNetworkSelectOptions';

export interface NetworkSelectProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function NetworkSelect({ className, children, ...rest }: NetworkSelectProps) {
  const options = useGetNetworkSelectOptions();

  return (
    <Select
      placeholder="Select network"
      options={options}
      className={clsx('NetworkSelect', className)}
      {...rest}
    />
  );
}

export default NetworkSelect;
