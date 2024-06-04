import {
  Col,
  Form,
  FormProps,
  Row,
  useTheme,
} from '@peersyst/react-components';
import clsx from 'clsx';
import Button from '../Button/Button';
import { useTranslate } from 'ui/locale';

export interface FormColProps extends FormProps {
  onCancel?: () => void;
  submitLabel?: string;
}

function FormCol({
  className,
  children,
  onCancel,
  submitLabel,
  ...rest
}: FormColProps) {
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
