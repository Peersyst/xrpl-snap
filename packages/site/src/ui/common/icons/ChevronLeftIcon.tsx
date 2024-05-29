import { SvgIcon, SvgIconProps } from '@peersyst/react-components';
import clsx from 'clsx';

export default function ChevronLeftIcon({
  className,
  ...rest
}: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon
      {...rest}
      data-testid="ChevronLeftIcon"
      className={clsx(undefined, 'Icon', className)}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0503 12.004L16 7.05423L14.5858 5.64001L8.92893 11.2969C8.53841 11.6874 8.53841 12.3206 8.92893 12.7111L14.5858 18.3679L16 16.9537L11.0503 12.004Z"
        fill="white"
      />
    </SvgIcon>
  );
}
