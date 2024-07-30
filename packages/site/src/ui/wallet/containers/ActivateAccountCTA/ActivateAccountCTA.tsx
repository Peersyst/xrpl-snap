import { Typography, useConfig, useModal } from '@peersyst/react-components';
import { NetworkChainId } from 'common/models';
import Button from 'ui/common/components/input/Button/Button';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import OnRampModal from 'ui/fiat-orders/transak/containers/OnRampModal';
import { useTranslate } from 'ui/locale';
import useGetActiveNetwork from 'ui/network/query/useGetActiveNetwork';

export interface ActivateAccountCTAProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function ActivateAccountCTA(): JSX.Element {
  const { data: network } = useGetActiveNetwork();
  const translate = useTranslate();
  const { testnet, devnet } = useConfig('faucetUrls');
  const { showModal } = useModal();

  switch (network?.chainId) {
    case NetworkChainId.MAINNET:
      return (
        <>
          <Typography variant="body1" light>
            {translate('inviteToBuyText')}
          </Typography>
          <Button variant="primary" onClick={() => showModal(OnRampModal)}>
            {translate('buyXRPCTAButton')}
          </Button>
        </>
      );
    case NetworkChainId.TESTNET:
    case NetworkChainId.DEVNET:
      return (
        <>
          <Typography variant="body1" light textAlign="center">
            {translate('inviteToGoToFaucetText')}
          </Typography>
          <ExternalLink to={network.chainId === NetworkChainId.TESTNET ? testnet : devnet}>
            <Button variant="primary">{translate('goToFaucetCTAButton')}</Button>
          </ExternalLink>
        </>
      );
    default:
      return <></>;
  }
}

export default ActivateAccountCTA;
