import { SvgIcon, SvgIconProps } from '@peersyst/react-components';
import clsx from 'clsx';

export default function ChevronRightIcon({
  className,
  ...rest
}: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon
      {...rest}
      data-testid="ChevronRightIcon"
      className={clsx(undefined, 'Icon', className)}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9497 11.996L8 16.9458L9.41421 18.36L15.0711 12.7031C15.4616 12.3126 15.4616 11.6795 15.0711 11.2889L9.41421 5.63208L8 7.0463L12.9497 11.996Z"
        fill="#636363"
      />
    </SvgIcon>
  );
}
