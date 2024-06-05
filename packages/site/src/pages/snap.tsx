import { CircularProgress, Col } from '@peersyst/react-components';
import clsx from 'clsx';
import RepositoryFactory from 'domain/adapter/RepositoryFactory';
import { useState } from 'react';
import Button from 'ui/common/components/input/Button/Button';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';
import { Client, Payment, Wallet } from 'xrpl';

export interface SnapPlaygroundProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const coldWalletConf = {
  publicKey:
    'EDEC21AF274B8D0A9A68323D973348A072F67A9743A8A5B456147F13101CB87146',
  privateKey:
    'EDE7AC462C3AC1656E6542468AD0135C1E1B29DE00CE0A8D1939A8FBB5D3CB3434',
  classicAddress: 'rDs1tpLzeros3TuDNKiaH2JD1SNgCLLPiM',
  seed: 'sEd7sgy55CusuvFLkxaHJiDCcwCiguc',
};

const hotWalletConf = {
  publicKey:
    'ED63A8C8F36269875972029D0041614A2462436A47031FB441D45FDBFCC2AF4748',
  privateKey:
    'EDDD017231563DA9041B03F7C14A53B6A2D51D5AA0980A978B934A1860B59B7220',
  classicAddress: 'r3Xp1usoVSrakNVubo5MRLsxm2evj9yECr',
  seed: 'sEdSvxzupe9pDeXEd3Q7d5sbt1fygsC',
};

const w1Conf = {
  publicKey:
    'ED8EB4214BE055A4DC31EF60B28D132024E9821C2E41602FCB1DC80BC9B5F07320',
  privateKey:
    'EDB33CFDF297B0BFA89B8177C7A52354ACC3E1585331BFD4F6B5D06AB17CBCDF90',
  classicAddress: 'rn55FW6QkcsE1jMUaGZqrgqbu7dHuwP51Q',
  seed: 'sEdSSMKdQPrSL9tmGjf2ociaAA9kzn8',
};

const w2Conf = {
  publicKey:
    'ED687C066F5F40CC7BE7D82BE339B3A1F735A4BB06787E3EC8F48D5BB852597D65',
  privateKey:
    'ED2151F631C5281EDAC9214BC3141F898BBDADBC43C06EE0442869C963C000BEA4',
  classicAddress: 'rwHQBWVWmDhi9PNpj55C9mwagJ2iAWuFdG',
  seed: 'sEdVnnE4Cra3kEvoLAnRbu8LS34mR66',
};
const mnemonic =
  'steak sponsor surround patch urban bean box october welcome enemy canvas gate';
const issuedCurrency = {
  issuer: coldWalletConf.classicAddress,
  currency: 'BCN',
};

function SnapPlayground({ className, children, ...rest }: SnapPlaygroundProps) {
  const address = useGetAddress();
  const [loading, setLoading] = useState(false);

  async function createTrustSetTransaction() {
    const trustSetSnapWallet = {
      TransactionType: 'TrustSet',
      Account: address!,
      LimitAmount: {
        currency: issuedCurrency.currency,
        issuer: issuedCurrency.issuer,
        value: '10000000000', // Large limit, arbitrarily chosen
      },
    } as const;

    const result = await RepositoryFactory.metamaskRepository.invokeSnap({
      method: 'xrpl_signAndSubmit',
      params: trustSetSnapWallet,
    });

    window.alert('TrustSet transaction created: ' + JSON.stringify(result));
  }

  async function claimBCNTokens() {
    setLoading(true);
    const issue_quantity = '3';
    const hotWallet = Wallet.fromSeed(hotWalletConf.seed);
    const send_token_tx2: Payment = {
      TransactionType: 'Payment',
      Account: hotWallet.address!,
      Amount: {
        currency: issuedCurrency.currency,
        value: issue_quantity,
        issuer: issuedCurrency.issuer,
      },
      Destination: address!,
      DestinationTag: 1, // Needed since we enabled Require Destination Tags
      // on the hot account earlier.
    };
    const client = new Client('wss://s.altnet.rippletest.net:51233');
    console.log('Connecting to Testnet...');

    await client.connect();
    const pay_prepared2 = await client.autofill(send_token_tx2);
    const pay_signed2 = hotWallet.sign(pay_prepared2);
    const pay_result2 = await client.submitAndWait(pay_signed2.tx_blob);

    await client.disconnect();

    setLoading(false);
    window.alert('BCN tokens claimed: ' + JSON.stringify(pay_result2));
  }

  return (
    <Col
      gap="2rem"
      css={{ padding: '4rem' }}
      className={clsx('', className)}
      {...rest}
    >
      <a href="/">GO BACK TO HOME PAGE</a>
      <Button onClick={createTrustSetTransaction}>Create TrustSet</Button>
      <Button onClick={claimBCNTokens}>Claim 3 BCN Tokens</Button>
      {loading && <CircularProgress />}
    </Col>
  );
}

export default SnapPlayground;
