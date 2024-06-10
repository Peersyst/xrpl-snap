import type { SvgIconProps } from '@peersyst/react-components';
import { SvgIcon } from '@peersyst/react-components';
import clsx from 'clsx';

export default function SuccessIcon({ className, ...rest }: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon {...rest} data-testid="SuccessIcon" className={clsx(undefined, 'Icon', className)} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6 12C21.6 17.3019 17.3019 21.6 12 21.6C6.69807 21.6 2.4 17.3019 2.4 12C2.4 6.69807 6.69807 2.4 12 2.4C17.3019 2.4 21.6 6.69807 21.6 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM7.14862 11.1373L10.1185 14.1072L16.9067 7.31894L18.6038 9.016L11.3913 16.2285C10.6883 16.9314 9.54862 16.9314 8.84568 16.2285L5.45156 12.8344L7.14862 11.1373Z"
        fill="#5BEB9D"
      />
    </SvgIcon>
  );
}
