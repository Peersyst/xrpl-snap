import { TextField, Typography } from '@peersyst/react-components';
import { useState } from 'react';
import AlertCallout from 'ui/common/components/feedback/AlertCallout/AlertCallout';
import type { FormColProps } from 'ui/common/components/input/FormCol/FormCol';
import FormCol from 'ui/common/components/input/FormCol/FormCol';
import XrplAddressTextField from 'ui/common/components/input/XrplAddressTextField/XrplAddressTextField';
import useGetAddress from 'ui/wallet/hooks/useGetAddress';

import { useTranslate } from '../../../locale';

export type AddTokenModalFormProps = {
  onSubmit: FormColProps['onSubmit'];
  onCancel?: FormColProps['onCancel'];
};

export function AddTokenModalForm({ onSubmit, onCancel }: AddTokenModalFormProps) {
  const translate = useTranslate();
  const [symbol, setSymbol] = useState<string | undefined>();
  const address = useGetAddress();

  return (
    <FormCol onSubmit={onSubmit} onCancel={onCancel}>
      <AlertCallout type="info" content={<Typography variant="body1">{translate('addTokenCallout')}</Typography>} />
      <XrplAddressTextField
        validators={{ ...(address && { notEq: [address, translate('canNotSendToYourself', { ns: 'error' })] }) }}
        placeholder={translate('tokenIssuer')}
        name="issuer"
        required
        label={translate('tokenIssuer')}
      />
      <TextField
        value={symbol}
        onChange={setSymbol}
        placeholder={translate('tokenSymbol')}
        name="currency"
        required
        label={translate('tokenSymbol')}
      />
    </FormCol>
  );
}
