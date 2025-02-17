import styled, { css } from 'styled-components';
import Button from 'ui/common/components/input/Button/Button';
import ChipIconButton from 'ui/common/components/input/ChipIconButton/ChipIconButton';

export const TokenAddIcon = styled(ChipIconButton)(
  () => css`
    width: 2.5rem;
    .ChipLabel.ChipLabel.ChipLabel {
      font-size: 1.25rem;
    }
  `,
);

export const ButtonRoot = styled(Button)(
  ({ theme }) => css`
    color: ${theme.palette.grey[600]};
    width: 13.5rem;
    padding: 0;
    justify-content: normal;
  `,
);
