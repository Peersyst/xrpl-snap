import styled, { css } from 'styled-components';
import Card from 'ui/common/components/surface/Card/Card';

export const TransactionViewerCard = styled(Card)(
  () => css`
    width: 100%;
    max-width: 100%;
    .json-view--string {
      word-break: break-all;
    }
  `,
);
