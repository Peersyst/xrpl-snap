import { Row } from '@peersyst/react-components';
import styled, { css } from "styled-components";
import { alpha } from '@peersyst/react-utils';

export const TokenRoot = styled(Row)(
  ({ theme }) => ({
      padding: "1.5rem 1.25rem 1.5rem 2rem",
      transition: "all 0.3s",
      borderRight: `1.5px solid ${theme.palette.primary}`,
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary, 0.08),
      }
    })
)
