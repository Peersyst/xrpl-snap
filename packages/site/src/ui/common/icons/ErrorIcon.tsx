import type { SvgIconProps } from '@peersyst/react-components';
import { SvgIcon } from '@peersyst/react-components';
import clsx from 'clsx';

export default function ErrorIcon({ className, ...rest }: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon {...rest} data-testid="ErrorIcon" className={clsx(undefined, 'Icon', className)} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21.6C17.3019 21.6 21.6 17.3019 21.6 12C21.6 6.69807 17.3019 2.4 12 2.4C6.69807 2.4 2.4 6.69807 2.4 12C2.4 17.3019 6.69807 21.6 12 21.6ZM12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM13.7139 12.016L16.6838 14.986L14.9868 16.683L12.0169 13.7131L9.04695 16.683L7.34989 14.986L10.3198 12.016L7.35 9.04625L9.04706 7.3492L12.0169 10.319L14.9866 7.3492L16.6837 9.04625L13.7139 12.016Z"
        fill="#FFE5F2"
      />
    </SvgIcon>
  );
}
