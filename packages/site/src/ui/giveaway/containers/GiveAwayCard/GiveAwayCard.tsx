import { Col, Image, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import { useState } from 'react';
import { giveawaybg, present } from 'ui/assets/images';
import Button from 'ui/common/components/input/Button/Button';
import { useTranslate } from 'ui/locale';

import GiveAwayModal from '../GiveAwayModal/GiveAwayModal';
import {
  GiveAwayCardBackgroundImage,
  GiveAwayCardContentWrapper,
  GiveAwayCardPresentWrapper,
  GiveAwayCardRoot,
} from './GiveAwayCard.styles';

export interface GiveAwayCardProps {
  className?: string;
  style?: React.CSSProperties;
}

function GiveAwayCard({ className, ...rest }: GiveAwayCardProps) {
  const [open, setOpen] = useState(false);
  const translate = useTranslate();

  return (
    <>
      <GiveAwayCardRoot className={clsx('GiveAwayCard', className)} {...rest}>
        <GiveAwayCardPresentWrapper>
          <GiveAwayCardBackgroundImage src={giveawaybg} alt="giveaway-bg" />
          <Image src={present} alt="present" css={{ marginTop: '1rem' }} />
        </GiveAwayCardPresentWrapper>
        <GiveAwayCardContentWrapper>
          <Col gap="0.25rem">
            <Typography variant="body1" fontWeight="400">
              {translate('giveAwayCardTitle')}
            </Typography>
            <Typography variant="body2" fontWeight="400" light>
              {translate('giveAwayCardText')}
            </Typography>
          </Col>
          <Button onClick={() => setOpen(true)}>{translate('more')}</Button>
        </GiveAwayCardContentWrapper>
      </GiveAwayCardRoot>
      <GiveAwayModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default GiveAwayCard;
