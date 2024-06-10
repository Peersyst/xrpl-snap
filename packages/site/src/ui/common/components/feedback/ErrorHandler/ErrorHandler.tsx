import { useToast } from '@peersyst/react-components';
import type { PropsWithChildren } from 'react';
import useSubscribeToError from 'ui/error/hooks/useSubscribeToError';

import type UIErrorEvent from '../../../../error/UIErrorEvent';
import type { LocaleErrorResource } from '../../../../locale';
import { useTranslate } from '../../../../locale';

const ErrorHandler = ({ children }: PropsWithChildren): JSX.Element => {
  const translateError = useTranslate('error');
  const { showToast } = useToast();

  const handleUiError = (event: UIErrorEvent) => {
    showToast(translateError([event.error.message as LocaleErrorResource, 'somethingWentWrong']), { type: event.error.severity });
  };

  useSubscribeToError({ handleUiError });

  return <>{children}</>;
};

export default ErrorHandler;
