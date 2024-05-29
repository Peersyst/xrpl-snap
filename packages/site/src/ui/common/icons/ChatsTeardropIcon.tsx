import { SvgIcon, SvgIconProps } from '@peersyst/react-components';
import clsx from 'clsx';

export default function ChatsTeardropIcon({
  className,
  ...rest
}: Omit<SvgIconProps, 'children'>): JSX.Element {
  return (
    <SvgIcon
      {...rest}
      data-testid="ChatsTeardropIcon"
      className={clsx(undefined, 'Icon', className)}
      fill="none"
    >
      <path
        d="M15.8972 6.80531C15.2184 5.21621 14.0118 3.91023 12.4812 3.10816C10.9506 2.3061 9.19006 2.05715 7.49712 2.40341C5.80418 2.74967 4.28274 3.6699 3.19001 5.00851C2.09727 6.34713 1.5003 8.02201 1.5 9.75V15.9375C1.5 16.2856 1.63828 16.6194 1.88442 16.8656C2.13056 17.1117 2.4644 17.25 2.8125 17.25H8.12531C8.71058 18.5865 9.67231 19.7238 10.8931 20.5229C12.1139 21.322 13.5409 21.7484 15 21.75H21.1875C21.5356 21.75 21.8694 21.6117 22.1156 21.3656C22.3617 21.1194 22.5 20.7856 22.5 20.4375V14.25C22.4996 12.4165 21.8277 10.6466 20.6111 9.27491C19.3945 7.90319 17.7175 7.02464 15.8972 6.80531ZM3 9.75C3 8.56331 3.35189 7.40327 4.01118 6.41658C4.67047 5.42988 5.60754 4.66085 6.7039 4.20672C7.80026 3.7526 9.00666 3.63378 10.1705 3.86529C11.3344 4.0968 12.4035 4.66824 13.2426 5.50736C14.0818 6.34647 14.6532 7.41557 14.8847 8.57946C15.1162 9.74334 14.9974 10.9497 14.5433 12.0461C14.0892 13.1425 13.3201 14.0795 12.3334 14.7388C11.3467 15.3981 10.1867 15.75 9 15.75H3V9.75ZM21 20.25H15C13.939 20.2488 12.8973 19.9669 11.9805 19.4329C11.0637 18.8989 10.3045 18.1319 9.78 17.2097C10.8072 17.1031 11.8013 16.7853 12.6999 16.2763C13.5985 15.7673 14.3822 15.078 15.0018 14.2517C15.6213 13.4255 16.0634 12.48 16.3003 11.4748C16.5371 10.4696 16.5636 9.42627 16.3781 8.41031C17.6937 8.72078 18.8659 9.46638 19.7047 10.5263C20.5436 11.5862 21 12.8983 21 14.25V20.25Z"
        fill="#A2A2A4"
      />
    </SvgIcon>
  );
}