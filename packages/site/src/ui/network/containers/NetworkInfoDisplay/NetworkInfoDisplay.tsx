import clsx from 'clsx';
import InfoDisplay from 'ui/common/components/display/InfoDisplay/InfoDisplay';
import { useTranslate } from 'ui/locale';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';

export type NetworkInfoDisplayProps = {
  className?: string;
  style?: React.CSSProperties;
};

function NetworkInfoDisplay({ className, ...rest }: NetworkInfoDisplayProps) {
  const { data: network } = useGetActiveNetwork();
  const translate = useTranslate();

  return <InfoDisplay title={translate('network')} content={network?.name} className={clsx('NetworkInfoDisplay', className)} {...rest} />;
}

export default NetworkInfoDisplay;
