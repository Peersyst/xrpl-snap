import type { SvgIconProps } from '@peersyst/react-components';
import { SvgIcon } from '@peersyst/react-components';
import clsx from 'clsx';

export default function InfoIcon({ className, ...rest }: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon {...rest} data-testid="InfoIcon" className={clsx(undefined, 'Icon', className)} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6 12C21.6 17.3019 17.3019 21.6 12 21.6C6.69807 21.6 2.4 17.3019 2.4 12C2.4 6.69807 6.69807 2.4 12 2.4C17.3019 2.4 21.6 6.69807 21.6 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM10.7999 7.19996C10.7999 6.53722 11.3372 5.99996 11.9999 5.99996C12.6627 5.99996 13.1999 6.53722 13.1999 7.19996C13.1999 7.8627 12.6627 8.39996 11.9999 8.39996C11.3372 8.39996 10.7999 7.8627 10.7999 7.19996ZM13.1999 17.9999H10.7999V9.59992H13.1999L13.1999 17.9999Z"
        fill="#4BB7FF"
      />
    </SvgIcon>
  );
}
