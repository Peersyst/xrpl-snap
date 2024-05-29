import { SvgIcon, SvgIconProps } from '@peersyst/react-components';
import clsx from 'clsx';

export default function WarningIcon({
  className,
  ...rest
}: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon
      {...rest}
      data-testid="WarningIcon"
      className={clsx(undefined, 'Icon', className)}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.68721L21.3088 19.8105L2.69122 19.8105L12 3.68721ZM9.67281 2.34361C10.7071 0.55213 13.2929 0.552133 14.3272 2.34361L23.636 18.4669C24.6703 20.2584 23.3774 22.4977 21.3088 22.4977H2.69122C0.622602 22.4977 -0.670281 20.2584 0.364028 18.4669L9.67281 2.34361ZM10.6563 7.718H13.3435V14.436H10.6563V7.718ZM13.3435 17.1232C13.3435 17.8653 12.742 18.4668 11.9999 18.4668C11.2578 18.4668 10.6563 17.8653 10.6563 17.1232C10.6563 16.3812 11.2578 15.7796 11.9999 15.7796C12.742 15.7796 13.3435 16.3812 13.3435 17.1232Z"
        fill="#FFCCB2"
      />
    </SvgIcon>
  );
}
