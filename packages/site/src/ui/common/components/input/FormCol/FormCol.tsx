import type { FormProps } from '@peersyst/react-components';
import { Col, Form, Row, useTheme } from '@peersyst/react-components';
import clsx from 'clsx';
import { useTranslate } from 'ui/locale';

import Button from '../Button/Button';

export type FormColProps = {
  onCancel?: () => void;
  submitLabel?: string;
} & FormProps;

function FormCol({ className, children, onCancel, submitLabel, ...rest }: FormColProps) {
  const { spacing } = useTheme();
  const translate = useTranslate();

  return (
    <Form className={clsx('FormCol', className)} {...rest}>
      <Col gap={spacing[8]}>
        {children}
        <Row gap={spacing[8]}>
          <Button fullWidth variant="secondary" onClick={onCancel}>
            {translate('cancel')}
          </Button>
          <Button type="submit" fullWidth variant="primary">
            {submitLabel || translate('confirm')}
          </Button>
        </Row>
      </Col>
    </Form>
  );
}

export default FormCol;
