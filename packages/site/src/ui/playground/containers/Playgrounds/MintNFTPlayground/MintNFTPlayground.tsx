import { Col, TextField, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import RepositoryFactory from 'domain/adapter/RepositoryFactory';
import { Link } from 'react-router-dom';
import FormCol from 'ui/common/components/input/FormCol/FormCol';
import NumericField from 'ui/common/components/input/NumericField/NumericField';
import { useTranslate } from 'ui/locale';
import NetworkInfoDisplay from 'ui/network/containers/NetworkInfoDisplay/NetworkInfoDisplay';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';
import { NFTokenMint, validate } from 'xrpl';

export interface MintNFTPlaygroundProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function MintNFTPlayground({ className, children, ...rest }: MintNFTPlaygroundProps) {
  const address = useGetAddress();
  const translate = useTranslate();

  async function handleSubmit({ NFTokenTaxon, Issuer, TransferFee, URI }: Record<string, any>) {
    const payment: NFTokenMint = {
      TransactionType: 'NFTokenMint',
      Account: address!,
      NFTokenTaxon,
      ...(Issuer && { Issuer }),
      ...(TransferFee && { TransferFee }),
      ...(URI && { URI }),
    };

    validate(payment as any);

    try {
      const result = await RepositoryFactory.metamaskRepository.invokeSnap({
        method: 'xrpl_signAndSubmit',
        params: payment,
      });

      // eslint-disable-next-line
      window.alert('NFTokenMint transaction created: ' + JSON.stringify(result));
    } catch (e) {}
  }

  return (
    <Col
      gap="2rem"
      css={{ padding: '2rem 2rem', overflowY: 'scroll', maxHeight: '43rem' }}
      className={clsx('XrpMintNFTPlayground', className)}
      {...rest}
      flex={1}
    >
      <Col>
        <Link to="/playground">Go back</Link>
        <Typography variant="h1">Mint NFT</Typography>
      </Col>
      <FormCol onSubmit={handleSubmit}>
        <NetworkInfoDisplay />
        <NumericField name="NFTokenTaxon" placeholder={translate('NFTokenTaxon')} required label={translate('NFTokenTaxon')} />
        <TextField placeholder={translate('Issuer')} name="Issuer" label={translate('Issuer')} />
        <NumericField name="TransferFee" placeholder={translate('TransferFee')} label={translate('TransferFee')} />
        <TextField name="URI" placeholder={translate('URI')} label={translate('URI')} />
        <NumericField name="Flags" placeholder={translate('Flags')} label={translate('Flags')} />
      </FormCol>
    </Col>
  );
}

export default MintNFTPlayground;
