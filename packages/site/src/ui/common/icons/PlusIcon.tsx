import type { SvgIconProps } from '@peersyst/react-components';
import { SvgIcon } from '@peersyst/react-components';
import clsx from 'clsx';

export default function PlusIcon({ className, ...rest }: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon {...rest} data-testid="PlusIcon" className={clsx(undefined, 'Icon', className)} fill="none">
      <path
        d="M24 12C24 12.2652 23.8946 12.5196 23.7072 12.7071C23.5196 12.8946 23.2652 13 23 13H13V23C13 23.2652 12.8946 23.5196 12.7071 23.7072C12.5196 23.8946 12.2652 24 12 24C11.7348 24 11.4804 23.8946 11.2929 23.7072C11.1054 23.5196 11 23.2652 11 23V13H1C0.73478 13 0.48042 12.8946 0.2929 12.7071C0.10536 12.5196 0 12.2652 0 12C0 11.7348 0.10536 11.4804 0.2929 11.2929C0.48042 11.1054 0.73478 11 1 11H11V1C11 0.73478 11.1054 0.48042 11.2929 0.2929C11.4804 0.10536 11.7348 0 12 0C12.2652 0 12.5196 0.10536 12.7071 0.2929C12.8946 0.48042 13 0.73478 13 1V11H23C23.2652 11 23.5196 11.1054 23.7072 11.2929C23.8946 11.4804 24 11.7348 24 12Z"
        fill="#7F7F87"
      />
    </SvgIcon>
  );
}
