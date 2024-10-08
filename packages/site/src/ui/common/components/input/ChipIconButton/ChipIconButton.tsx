import { Chip, InfoIcon } from '@peersyst/react-components';
import clsx from 'clsx';
import styled, { css } from 'styled-components';

export type ChipIconButtonProps = {
  className?: string;
  style?: React.CSSProperties;
  Icon: typeof InfoIcon;
  onClick?: () => void;
  size?: 'md' | 'lg';
};

const ChipIconButtonRoot = styled(Chip)(
  ({ size, theme }) => css`
    &.ChipIconButton.ChipIconButton.ChipIconButton {
      padding: 0;
      width: ${size === 'md' ? '2rem' : '2.5rem'};
      height: ${size === 'md' ? '2rem' : '2.5rem'};
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      .ChipLabel {
        display: flex;
      }
      &:hover {
        border-color: ${theme.palette.grey[400]};
        .Icon {
          color: ${theme.palette.grey[400]};
        }
      }
      &:active {
        background-color: ${theme.palette.grey[300]};
        .Icon {
          color: ${theme.palette.grey[400]};
        }
      }
    }
  `,
);

function ChipIconButton({ className, size = 'md', Icon = InfoIcon, ...rest }: ChipIconButtonProps) {
  return <ChipIconButtonRoot size={size} className={clsx('ChipIconButton', className)} label={<Icon />} {...rest} />;
}

export default ChipIconButton;
