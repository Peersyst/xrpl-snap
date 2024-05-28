import { SvgIcon, SvgIconProps } from '@peersyst/react-components';
import clsx from 'clsx';

export default function ExchangeIcon({
  className,
  ...rest
}: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon
      {...rest}
      data-testid="ExchangeIcon"
      className={clsx(undefined, 'Icon', className)}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.4739 8.00517L14.556 11.9231L15.9702 13.3373L21.627 7.68044C22.0176 7.28992 22.0176 6.65675 21.627 6.26623L15.9702 0.609375L14.556 2.02359L18.5375 6.00517L8.91992 6.00517L8.91992 8.00517L18.4739 8.00517ZM7.36598 16.0254L11.2839 12.1074L9.86968 10.6932L4.21283 16.3501C3.8223 16.7406 3.8223 17.3738 4.21283 17.7643L9.86968 23.4212L11.2839 22.0069L7.30231 18.0254L16.9199 18.0254L16.9199 16.0254L7.36598 16.0254Z"
        fill="#B480FF"
      />
    </SvgIcon>
  );
}
