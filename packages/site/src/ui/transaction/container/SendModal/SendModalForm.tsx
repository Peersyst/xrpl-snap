import { useTranslate } from '../../../locale';
import { Typography } from '@peersyst/react-components';
import { Token, TokenWithBalance } from 'common/models/token';
import { useState } from 'react';
import AlertCallout from 'ui/common/components/feedback/AlertCallout/AlertCallout';
import AmountField from 'ui/common/components/input/AmountField/AmountField';
import FormCol, {
  FormColProps,
} from 'ui/common/components/input/FormCol/FormCol';
import XrplAddressTextField from 'ui/common/components/input/XrplAddressTextField/XrplAddressTextField';
import NetworkInfoDisplay from 'ui/network/containers/NetworkInfoDisplay/NetworkInfoDisplay';
import TokenSelect from 'ui/token/containers/TokenSelect/TokenSelect';

export interface SendModalFormProps {
  onSubmit: FormColProps['onSubmit'];
  onCancel?: FormColProps['onCancel'];
}

export function SendModalForm({ onSubmit, onCancel }: SendModalFormProps) {
  const translate = useTranslate();
  const [token, setToken] = useState<TokenWithBalance | undefined>();

  return (
    <FormCol onSubmit={onSubmit} onCancel={onCancel}>
      <AlertCallout
        type="info"
        content={
          <Typography variant="body1">{translate('sendCallout')}</Typography>
        }
      />
      <NetworkInfoDisplay />
      <XrplAddressTextField
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
    </FormCol>
  );
}
