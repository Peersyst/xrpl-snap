import { SvgIcon, SvgIconProps } from '@peersyst/react-components';
import clsx from 'clsx';

export default function ClockIcon({
  className,
  ...rest
}: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon
      {...rest}
      data-testid="ClockIcon"
      className={clsx(undefined, 'Icon', className)}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9412 3.82353H5.64706C4.08767 3.82353 2.82353 5.08767 2.82353 6.64706V17.9412C2.82353 19.5006 4.08767 20.7647 5.64706 20.7647H16.9412C18.5006 20.7647 19.7647 19.5006 19.7647 17.9412V6.64706C19.7647 5.08767 18.5006 3.82353 16.9412 3.82353ZM5.64706 1C2.52828 1 0 3.52828 0 6.64706V17.9412C0 21.06 2.52828 23.5882 5.64706 23.5882H16.9412C20.06 23.5882 22.5882 21.06 22.5882 17.9412V12.2941H23C23.5523 12.2941 24 11.8464 24 11.2941V9.05882C24 8.50654 23.5523 8.05882 23 8.05882H22.5882V6.64706C22.5882 3.52828 20.06 1 16.9412 1H5.64706ZM12 5.23527V11.5882H16.9412V13H11.6471C11.0623 13 10.5882 12.5259 10.5882 11.9412V5.23527H12Z"
        fill="black"
      />
    </SvgIcon>
  );
}