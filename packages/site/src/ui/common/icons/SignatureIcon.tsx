import type { SvgIconProps } from '@peersyst/react-components';
import { SvgIcon } from '@peersyst/react-components';
import clsx from 'clsx';

export default function SignatureIcon({ className, ...rest }: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon {...rest} data-testid="SignatureIcon" className={clsx(undefined, 'Icon', className)} fill="none">
      <path
        d="M12 15.0001L20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12Z"
        stroke="#A2A2A4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 5L19 8" stroke="#A2A2A4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9.00001 7.07031C7.25106 7.32659 5.66374 8.23487 4.55665 9.61287C3.44955 10.9909 2.9046 12.7366 3.03117 14.4997C3.15774 16.2628 3.94646 17.9128 5.23903 19.1185C6.53161 20.3242 8.23238 20.9965 10 21.0003C11.6831 21.0001 13.3099 20.3937 14.5824 19.292C15.8549 18.1903 16.6879 16.6671 16.929 15.0013"
        stroke="#A2A2A4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}
