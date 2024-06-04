import { useTranslate } from '../../../locale';
import { Typography } from '@peersyst/react-components';
import AlertCallout from 'ui/common/components/feedback/AlertCallout/AlertCallout';
import AmountField from 'ui/common/components/input/AmountField/AmountField';
import FormCol, {
  FormColProps,
} from 'ui/common/components/input/FormCol/FormCol';
import XrplAddressTextField from 'ui/common/components/input/XrplAddressTextField/XrplAddressTextField';
import NetworkInfoDisplay from 'ui/network/containers/NetworkInfoDisplay/NetworkInfoDisplay';

export interface SendModalFormProps {
  onSubmit: FormColProps['onSubmit'];
  onCancel?: FormColProps['onCancel'];
}

export function SendModalForm({ onSubmit, onCancel }: SendModalFormProps) {
  const translate = useTranslate();

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
        label={translate('to')}
      />
      <AmountField
        placeholder={translate('enterAmount')}
        name="amount"
        label={translate('amount')}
      />
    </FormCol>
  );
}
