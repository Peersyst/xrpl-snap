import { useToast } from '@peersyst/react-components';
import { PropsWithChildren } from 'react';
import { LocaleErrorResource, useTranslate } from '../../../../locale';
import UIErrorEvent from '../../../../error/UIErrorEvent';
import useSubscribeToError from '../../../../error/hooks/useSubscribeToError';

const ErrorHandler = ({ children }: PropsWithChildren): JSX.Element => {
  const translateError = useTranslate('error');
  const { showToast } = useToast();

  const handleUiError = (event: UIErrorEvent) => {
    showToast(
      translateError([
        event.error.message as LocaleErrorResource,
        'somethingWentWrong',
      ]),
      { type: event.error.severity },
    );
  };

  useSubscribeToError({ handleUiError });

  return <>{children}</>;
};

export default ErrorHandler;
