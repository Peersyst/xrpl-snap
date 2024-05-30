import styled, { css } from "styled-components";
import { alpha } from '@peersyst/react-utils';
import { Image, Row } from '@peersyst/react-components';

export const TransactionRoot = styled(Row)(
  ({ theme }) => ({
    transition: "all 0.3s",
    "&:hover": {
      color: theme.palette.primary,
    }
  })
)

export const DirectionLogo = styled(Image)(
  () => ({
      width: "2.5rem",
    }),
)
