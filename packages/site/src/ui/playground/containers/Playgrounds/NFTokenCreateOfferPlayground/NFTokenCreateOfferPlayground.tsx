import { Col, TextField, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import RepositoryFactory from 'domain/adapter/RepositoryFactory';
import { Link } from 'react-router-dom';
import FormCol from 'ui/common/components/input/FormCol/FormCol';
import NumericField from 'ui/common/components/input/NumericField/NumericField';
import { useTranslate } from 'ui/locale';
import NetworkInfoDisplay from 'ui/network/containers/NetworkInfoDisplay/NetworkInfoDisplay';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';
import { validate, type NFTokenCreateOffer } from 'xrpl';

export interface NFTokenCreateOfferPlaygroundProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function NFTokenCreateOfferPlayground({ className, children, ...rest }: NFTokenCreateOfferPlaygroundProps) {
  const address = useGetAddress();
  const translate = useTranslate();

  async function handleSubmit({ NFTokenTaxon, Issuer, TransferFee, URI }: Record<string, any>) {
    const payment: NFTokenCreateOffer = {
      TransactionType: 'NFTokenCreateOffer',
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
      window.alert('NFTokenCreateOffer transaction created: ' + JSON.stringify(result));
    } catch (e) {}
  }

  return (
    <Col
      gap="2rem"
      css={{ padding: '2rem 2rem', overflowY: 'scroll', maxHeight: '43rem' }}
      className={clsx('XrpNFTokenCreateOffer', className)}
      {...rest}
      flex={1}
    >
      <Col>
        <Link to="/playground">Go back</Link>
        <Typography variant="h1">CreateOffer NFT</Typography>
      </Col>
      <FormCol onSubmit={handleSubmit}>
        <NetworkInfoDisplay />
        <TextField placeholder={translate('NFTokenID')} name="NFTokenID" label={translate('NFTokenID')} />
        <NumericField name="Amount" placeholder={translate('Amount')} label={translate('Amount')} />
        <TextField name="Owner" placeholder={translate('Owner')} label={translate('Owner')} />
        <NumericField name="Expiration" placeholder={translate('Expiration')} label={translate('Expiration')} />
        <TextField name="Destination" placeholder={translate('Destination')} label={translate('Destination')} />
      </FormCol>
    </Col>
  );
}

export default NFTokenCreateOfferPlayground;
