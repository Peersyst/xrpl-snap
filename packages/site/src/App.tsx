import type { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import Providers from './ui/Providers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

export type AppProps = {
  children: ReactNode;
};

//TODO: Add base page here
export const App: FunctionComponent<AppProps> = ({ children }) => {
  return (
    <Providers>
      <Wrapper>{children}</Wrapper>
    </Providers>
  );
};
