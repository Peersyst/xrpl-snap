import { Typography } from '@peersyst/react-components';
import type { TokenWithBalance } from 'common/models/token';
import Amount from 'common/utils/Amount';
import { useState } from 'react';
import AlertCallout from 'ui/common/components/feedback/AlertCallout/AlertCallout';
import AmountField from 'ui/common/components/input/AmountField/AmountField';
import type { FormColProps } from 'ui/common/components/input/FormCol/FormCol';
import FormCol from 'ui/common/components/input/FormCol/FormCol';
import NumericField from 'ui/common/components/input/NumericField/NumericField';
import XrplAddressTextField from 'ui/common/components/input/XrplAddressTextField/XrplAddressTextField';
import NetworkInfoDisplay from 'ui/network/containers/NetworkInfoDisplay/NetworkInfoDisplay';
import TokenSelect from 'ui/token/containers/TokenSelect/TokenSelect';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';
import useGetTokens from 'ui/wallet/query/useGetTokens';

import { useTranslate } from '../../../locale';

export type SendModalFormProps = {
  onSubmit: FormColProps['onSubmit'];
  onCancel?: FormColProps['onCancel'];
};

export function SendModalForm({ onSubmit, onCancel }: SendModalFormProps) {
  const translate = useTranslate();
  const { data: tokens = [] } = useGetTokens();
  const [token, setToken] = useState<TokenWithBalance | undefined>(tokens[0]);
  const address = useGetAddress();

  return (
    <FormCol onSubmit={onSubmit} onCancel={onCancel}>
      <AlertCallout type="info" content={<Typography variant="body1">{translate('sendCallout')}</Typography>} />
      <NetworkInfoDisplay />
      <XrplAddressTextField
        validators={{ ...(address && { notEq: [address, translate('canNotSendToYourself', { ns: 'error' })] }) }}
        placeholder={translate('pasteRecipientAddress')}
        name="destination"
        required
        label={translate('to')}
      />
      <NumericField
        label={`${translate('destinationTag')} (${translate('optional')})`}
        placeholder={translate('enterDestinationTag')}
        name="destinationTag"
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
        balance={token?.balance ?? new Amount('0', 6, 'XRP')}
        placeholder={translate('enterAmount')}
        name="amount"
        required
        label={translate('amount')}
      />
    </FormCol>
  );
}
