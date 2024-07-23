import { ChevronDownIcon } from 'ui/common/icons';

import { TokenSelectDropdownElementIcon, TokenSelectDropdownElementRoot } from './TokenSelectDropdownElement.styles';

export interface TokenSelectDropdownElementProps {
  open: boolean;
}

function TokenSelectDropdownElement({ open }: TokenSelectDropdownElementProps) {
  return (
    <TokenSelectDropdownElementRoot open={open}>
      <TokenSelectDropdownElementIcon open={open} Icon={ChevronDownIcon} />
    </TokenSelectDropdownElementRoot>
  );
}

export default TokenSelectDropdownElement;
