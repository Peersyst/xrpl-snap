import type { LinkProps } from 'react-router-dom';

export type ConditionalLinkProps = {
  condition: boolean;
} & LinkProps;
