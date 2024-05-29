import { defaultSnapOrigin } from '../common/constants/snap';
import {
  useMetaMask,
  useInvokeSnap,
  useMetaMaskContext,
  useRequestSnap,
} from '../ui/snap/hooks';
import { isLocalSnap, shouldDisplayReconnectButton } from '../ui/snap/utils';
import { Col, Paper, Typography } from '@peersyst/react-components';

/**
 * TODO(jordi): restore the original content of this file.
 */
const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const handleGetAccount = async () => {
    const res = await invokeSnap({ method: 'xrpl_getAccount' });
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(res, undefined, 4));
  };
  const handleGetActiveNetwork = async () => {
    const res = await invokeSnap({ method: 'xrpl_getActiveNetwork' });
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(res, undefined, 4));
  };
  const handleGetStoredNetworks = async () => {
    const res = await invokeSnap({ method: 'xrpl_getStoredNetworks' });
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(res, undefined, 4));
  };
  const handleChangeNetwork = async () => {
    const res = await invokeSnap({
      method: 'xrpl_changeNetwork',
      params: { chainId: 2 },
    });
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(res, undefined, 4));
  };
  const handleSignMessage = async () => {
    const res = await invokeSnap({
      method: 'xrpl_signMessage',
      params: { message: 'Hello world!' },
    });
    // eslint-disable-next-line no-alert
    alert(res);
  };
  const handleSignTransaction = async () => {
    const res = await invokeSnap({
      method: 'xrpl_sign',
      params: {
        TransactionType: 'Payment',
        Account: 'rPsqhWc6GHWfWA99mXzY3tqw7gbBF3APab',
        Destination: 'rPsqhWc6GHWfWA99mXzY3tqw7gbBF3APab',
        Amount: '1',
      },
    });
    // eslint-disable-next-line no-alert
    alert(res);
  };
  const handleSignAndSubmitTransaction = async () => {
    const res = await invokeSnap({
      method: 'xrpl_signAndSubmit',
      params: {
        TransactionType: 'Payment',
        Account: 'rPsqhWc6GHWfWA99mXzY3tqw7gbBF3APab',
        Destination: 'rrnrZNu1RdJBWyQnqmZczhMQGXZ7YzG6HB',
        Amount: '1000000',
      },
    });
    // eslint-disable-next-line no-alert
    alert(res);
  };

  return (
    <Col>
      <h1>Not found</h1>
    </Col>
  );
};

export default Index;
