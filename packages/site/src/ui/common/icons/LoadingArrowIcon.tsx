import type { SvgIconProps } from '@peersyst/react-components';
import { SvgIcon } from '@peersyst/react-components';
import clsx from 'clsx';

export default function LoadingArrowIcon({ className, ...rest }: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon {...rest} data-testid="LoadingArrowIcon" className={clsx(undefined, 'Icon', className)} fill="none">
      <g clipPath="url(#clip0_1323_852)">
        <path
          d="M9 4.5501C10.9759 3.75445 13.1869 3.77629 15.1466 4.61083C17.1064 5.44537 18.6544 7.02423 19.45 9.00009C20.2457 10.976 20.2238 13.187 19.3893 15.1467C18.5547 17.1065 16.9759 18.6544 15 19.4501M15 15.0001V20.0001H20"
          stroke="#A2A2A4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M5.62988 7.16016V7.17016" stroke="#A2A2A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.06006 11V11.01" stroke="#A2A2A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.62988 15.0996V15.1096" stroke="#A2A2A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.16016 18.3691V18.3791" stroke="#A2A2A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 19.9395V19.9495" stroke="#A2A2A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </g>
      <defs>
        <clipPath id="clip0_1323_852">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}
