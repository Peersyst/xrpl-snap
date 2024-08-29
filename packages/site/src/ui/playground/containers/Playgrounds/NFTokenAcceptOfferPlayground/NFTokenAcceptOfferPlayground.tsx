import { Col, TextField, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import RepositoryFactory from 'domain/adapter/RepositoryFactory';
import { Link } from 'react-router-dom';
import FormCol from 'ui/common/components/input/FormCol/FormCol';
import NumericField from 'ui/common/components/input/NumericField/NumericField';
import { useTranslate } from 'ui/locale';
import NetworkInfoDisplay from 'ui/network/containers/NetworkInfoDisplay/NetworkInfoDisplay';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';
import { validate, type NFTokenAcceptOffer } from 'xrpl';

export interface NFTokenAcceptOfferPlaygroundProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function NFTokenAcceptOfferPlayground({ className, children, ...rest }: NFTokenAcceptOfferPlaygroundProps) {
  const address = useGetAddress();
  const translate = useTranslate();

  async function handleSubmit({ NFTokenSellOffer, NFTokenBuyOffer, NFTokenBrokerFee }: Record<string, any>) {
    const payment: NFTokenAcceptOffer = {
      TransactionType: 'NFTokenAcceptOffer',
      Account: address!,
      ...(NFTokenSellOffer && { NFTokenSellOffer }),
      ...(NFTokenBuyOffer && { NFTokenBuyOffer }),
      ...(NFTokenBrokerFee && { NFTokenBrokerFee }),
    };

    validate(payment as any);

    try {
      const result = await RepositoryFactory.metamaskRepository.invokeSnap({
        method: 'xrpl_signAndSubmit',
        params: payment,
      });

      // eslint-disable-next-line
      window.alert('NFTokenAcceptOffer transaction created: ' + JSON.stringify(result));
    } catch (e) {}
  }

  return (
    <Col
      gap="2rem"
      css={{ padding: '2rem 2rem', overflowY: 'scroll', maxHeight: '43rem' }}
      className={clsx('XrpNFTokenAcceptOffer', className)}
      {...rest}
      flex={1}
    >
      <Col>
        <Link to="/playground">Go back</Link>
        <Typography variant="h1">NFTokenAcceptOffer NFT</Typography>
      </Col>
      <FormCol onSubmit={handleSubmit}>
        <NetworkInfoDisplay />
        <TextField placeholder={translate('NFTokenSellOffer')} name="NFTokenSellOffer" label={translate('NFTokenSellOffer')} />
        <TextField name="NFTokenBuyOffer" placeholder={translate('NFTokenBuyOffer')} label={translate('NFTokenBuyOffer')} />
        <NumericField
          suffix="Only XRP"
          name="NFTokenBrokerFee"
          placeholder={translate('NFTokenBrokerFee')}
          label={translate('NFTokenBrokerFee')}
        />
      </FormCol>
    </Col>
  );
}

export default NFTokenAcceptOfferPlayground;
