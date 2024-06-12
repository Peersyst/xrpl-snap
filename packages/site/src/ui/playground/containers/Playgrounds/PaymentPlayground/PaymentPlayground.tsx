import { BlockchainAddress, Col, Label, TextField } from '@peersyst/react-components';
import clsx from 'clsx';
import type { TokenWithBalance } from 'common/models/token';
import RepositoryFactory from 'domain/adapter/RepositoryFactory';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AmountField from 'ui/common/components/input/AmountField/AmountField';
import FormCol from 'ui/common/components/input/FormCol/FormCol';
import NumericField from 'ui/common/components/input/NumericField/NumericField';
import XrplAddressTextField from 'ui/common/components/input/XrplAddressTextField/XrplAddressTextField';
import { useTranslate } from 'ui/locale';
import NetworkInfoDisplay from 'ui/network/containers/NetworkInfoDisplay/NetworkInfoDisplay';
import TokenSelect from 'ui/token/containers/TokenSelect/TokenSelect';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';
import { validate, xrpToDrops } from 'xrpl';

export interface PaymentPlaygroundProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function PaymentPlayground({ className, children, ...rest }: PaymentPlaygroundProps) {
  const [token, setToken] = useState<TokenWithBalance | undefined>();
  const address = useGetAddress();
  const translate = useTranslate();

  async function handleSubmit({ amount, destination, token, DestinationTag, InvoiceID }: Record<string, any>) {
    if (token.currency !== 'XRP') {
      // eslint-disable-next-line
      window.alert('Only XRP is supported here');
      return;
    }

    const payment = {
      TransactionType: 'Payment',
      // @ts-ignore
      Account: address!,
      Destination: destination,
      Amount: xrpToDrops(amount),
      ...(Boolean(DestinationTag) && { DestinationTag: Number(DestinationTag) }),
      ...(InvoiceID && { InvoiceID }),
    };

    validate(payment);

    try {
      const result = await RepositoryFactory.metamaskRepository.invokeSnap({
        method: 'xrpl_signAndSubmit',
        params: payment,
      });

      // eslint-disable-next-line
      window.alert('TrustSet transaction created: ' + JSON.stringify(result));
    } catch (e) {}
  }

  return (
    <Col
      gap="2rem"
      css={{ padding: '2rem 2rem', overflowY: 'scroll', maxHeight: '43rem' }}
      className={clsx('XrpPaymentPlayground', className)}
      {...rest}
      flex={1}
    >
      <Link to="/playground">Go back</Link>
      <FormCol onSubmit={handleSubmit}>
        <NetworkInfoDisplay />
        <Label label="Example address">
          <BlockchainAddress
            showCopyIcon
            type="testnetAddress"
            action="copy"
            variant="body1"
            address={'rwHQBWVWmDhi9PNpj55C9mwagJ2iAWuFdG'}
          />
        </Label>
        <XrplAddressTextField
          validators={{ ...(address && { notEq: [address, translate('canNotSendToYourself', { ns: 'error' })] }) }}
          placeholder={translate('pasteRecipientAddress')}
          name="destination"
          required
          label={translate('to')}
        />

        <TokenSelect
          value={token}
          onChange={setToken}
          required
          name="token"
          label={translate('selectToken')}
          placeholder={translate('selectTokenToSend')}
        />
        <AmountField
          maxDecimals={token?.decimals ?? 6}
          validators={{ gt: [0, translate('cantSendZero', { ns: 'error' })] }}
          balance={token?.balance}
          placeholder={translate('enterAmount')}
          name="amount"
          required
          label={translate('amount')}
        />
        <NumericField name="DestinationTag" label="Destination Tag (optional)" placeholder="Enter Destination Tag" />
        <TextField name="InvoiceID" label="Invoice ID (optional)" placeholder="Enter Invoice ID" />
      </FormCol>
    </Col>
  );
}

export default PaymentPlayground;
