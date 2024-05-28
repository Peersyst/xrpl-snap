import { Col } from '@peersyst/react-components';
import { useControlled } from '@peersyst/react-hooks';
import clsx from 'clsx';
import Amount from 'src/common/utils/Amount';
import useFormatAmount from 'src/ui/common/hooks/useFormatAmount';
import { useTranslate } from 'src/ui/locale';

import NumericField from '../NumericField/NumericField';
import { MaxAmountTypography } from './AmountField.styles';
import type { AmountFieldProps } from './AmountField.types';

function AmountField({
  balance: balanceProp,
  style,
  className,
  defaultValue = '',
  value: valueProp,
  onChange: onChangeProp,
  error = false,
  maxDecimals,
  ...rest
}: AmountFieldProps): JSX.Element {
  const translate = useTranslate();
  const formatAmount = useFormatAmount();

  const [value, setValue] = useControlled(
    defaultValue,
    valueProp,
    onChangeProp,
  );

  const balance = balanceProp
    ? balanceProp.gt('0')
      ? balanceProp
      : new Amount('0', balanceProp.decimals, balanceProp.currency)
    : undefined;
  const isValidAmount = !value || !balance || balance.canPay(value);

  const handleLoadMax = () => {
    setValue(balance.formatAmount());
  };

  return (
    <Col style={style} className={clsx('AmountField', className)} gap={12}>
      <NumericField
        error={error || !isValidAmount}
        value={value}
        onChange={setValue}
        maxDecimals={maxDecimals || balance?.decimals}
        {...rest}
      />
      {balance !== undefined && (
        <MaxAmountTypography
          variant="caption2"
          isValidAmount={isValidAmount}
          onClick={handleLoadMax}
        >{`${translate('sendMax')}: ${formatAmount(
          balance,
        )}`}</MaxAmountTypography>
      )}
    </Col>
  );
}

export default AmountField;
