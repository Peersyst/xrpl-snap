import { Row, Typography } from '@peersyst/react-components';
import { alpha } from '@peersyst/react-utils';
import clsx from 'clsx';
import styled, { css } from 'styled-components';
import type { QrIcon } from 'ui/common/icons';
import { InfoIcon } from 'ui/common/icons';

export type PopoverListItemProps = {
  className?: string;
  style?: React.CSSProperties;
  text: string;
  Icon?: typeof QrIcon;
  onClick?: () => void;
  prefix?: React.ReactNode;
};

const PopoverListItemRoot = styled(Row)(
  ({ theme }) => css`
    padding: ${theme.spacing.all(4)};
    column-gap: ${theme.spacing[2]};
    cursor: pointer;
    align-items: center;
    &:hover {
      background-color: ${alpha(theme.palette.grey[100], 0.08)};
    }
  `,
);

const PopoverListItemIcon = styled.div(
  ({ theme }) => css`
    color: ${alpha(theme.palette.grey[100], 0.52)};
    font-size: 1rem;
  `,
);

function PopoverListItem({ className, text, prefix, Icon = InfoIcon, onClick, ...rest }: PopoverListItemProps) {
  return (
    <PopoverListItemRoot onClick={onClick} className={clsx('PopoverListItem', className)} {...rest}>
      {prefix ?? <PopoverListItemIcon as={Icon} />}
      <Typography variant="body1">{text}</Typography>
    </PopoverListItemRoot>
  );
}

export default PopoverListItem;
