import { SvgIcon, SvgIconProps } from '@peersyst/react-components';
import clsx from 'clsx';

export default function VerifiedIcon({
  className,
  ...rest
}: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon
      {...rest}
      data-testid="VerifiedIcon"
      className={clsx(undefined, 'Icon', className)}
      fill="none"
    >
      <g clipPath="url(#clip0_2250_877)">
        <path
          d="M23.3722 12.7172C23.7317 12.306 23.7317 11.6922 23.3722 11.2809L21.3384 8.95545L21.6216 5.88211C21.6718 5.3372 21.3106 4.83942 20.7769 4.7182L17.7711 4.03545L16.1973 1.37079C15.9183 0.898341 15.3317 0.70667 14.8275 0.923171L12.0002 2.13727L9.17165 0.922648C8.66799 0.706371 8.08206 0.897403 7.80265 1.36898L6.2293 4.02454L3.22632 4.69834C2.69142 4.81836 2.32866 5.3167 2.37883 5.86261L2.66203 8.94454L0.625885 11.281C0.267451 11.6924 0.267995 12.3053 0.627156 12.7159L2.66203 15.0427L2.37859 18.1272C2.32853 18.672 2.68976 19.1696 3.22328 19.2908L6.2293 19.9736L7.80143 22.6272C8.08136 23.0996 8.66885 23.2903 9.17291 23.0724L12.0002 21.85L14.8288 23.0646C15.3324 23.2809 15.9183 23.0898 16.1978 22.6183L17.7711 19.9627L20.7769 19.2799C21.3106 19.1587 21.6718 18.6609 21.6216 18.116L21.3384 15.0427L23.3722 12.7172ZM9.14203 16.3736L6.54566 13.7554C6.12021 13.33 6.12021 12.6427 6.54566 12.2173L6.62203 12.1409C7.04748 11.7154 7.74566 11.7154 8.17112 12.1409L9.92748 13.9082L15.5457 8.27908C15.9711 7.85363 16.6693 7.85363 17.0948 8.27908L17.1711 8.35545C17.5966 8.7809 17.5966 9.46817 17.1711 9.89363L10.7129 16.3736C10.2657 16.7991 9.57839 16.7991 9.14203 16.3736Z"
          fill="#B480FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_2250_877">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}