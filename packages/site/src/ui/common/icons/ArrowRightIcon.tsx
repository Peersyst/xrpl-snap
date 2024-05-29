import { SvgIcon, SvgIconProps } from '@peersyst/react-components';
import clsx from 'clsx';

export default function ArrowRightIcon({
  className,
  ...rest
}: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon
      {...rest}
      data-testid="ArrowRightIcon"
      className={clsx(undefined, 'Icon', className)}
      fill="none"
    >
      <g id="arrow-right">
        <path
          id="Vector"
          d="M5.5 12H19.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M12.5 5L19.5 12L12.5 19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SvgIcon>
  );
}
