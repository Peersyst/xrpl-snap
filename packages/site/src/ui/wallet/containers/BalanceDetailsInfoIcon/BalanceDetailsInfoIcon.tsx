import { useState } from 'react';
import ChipIconButton from 'ui/common/components/input/ChipIconButton/ChipIconButton';
import { InfoIcon } from 'ui/common/icons';

import BalanceDetailsModal from '../BalanceDetailsModal/BalanceDetailsModal';

function BalanceDetailsInfoIcon() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ChipIconButton Icon={InfoIcon} onClick={() => setOpen(true)} />
      <BalanceDetailsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default BalanceDetailsInfoIcon;
