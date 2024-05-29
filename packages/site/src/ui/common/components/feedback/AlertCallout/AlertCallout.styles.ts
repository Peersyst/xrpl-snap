import { Alert } from '@peersyst/react-components';
import styled from 'styled-components';

export const AlertCalloutRoot = styled(Alert)`
  padding: 1rem;
  font-size: 0.875rem;

  .Icon {
    font-size: 1rem;
  }

  & > div {
    & > div {
      column-gap: 0.5rem;

      & > div:first-child {
        flex: unset;
      }
    }
  }
`;
