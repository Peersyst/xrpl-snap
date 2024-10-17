import { Col, Typography, useConfig, useToast } from '@peersyst/react-components';
import { useControlled, useCopyToClipboard } from '@peersyst/react-hooks';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { present } from 'ui/assets/images';
import Button from 'ui/common/components/input/Button/Button';
import ExternalLink from 'ui/common/components/navigation/ExternalLink/ExternalLink';
import useGetPromoCode from 'ui/giveaway/query/useGetPromoCode';

import type { ModalProps } from '../../../common/components/feedback/Modal/Modal.types';
import { useTranslate } from '../../../locale';
import {
  GiveAwayFooterCard,
  GiveAwayFooterCardContent,
  GiveAwayModalBody,
  GiveAwayModalHeader,
  GiveAwayModalHeaderBackground,
  GiveAwayModalRoot,
} from './GiveAwayModal.styles';

function GiveAwayModal({ defaultOpen, open: openProp, onClose, ...rest }: ModalProps) {
  const translate = useTranslate();
  const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);
  const { data: promoCode } = useGetPromoCode();
  const { showToast } = useToast();
  const surveyUrl = useConfig('surveyUrl');

  function handleOnCopy() {
    showToast(translate('promoCodeCopied'), { type: 'success' });
  }

  const { copyToClipboard } = useCopyToClipboard({ onCopy: handleOnCopy });

  function handleCopyCode() {
    copyToClipboard(promoCode || '');
  }

  useEffect(() => {
    if (open) {
      confetti({
        particleCount: 200,
        spread: 200,
        origin: { y: 0.6 },
      });
    }
  }, [open]);

  return (
    <GiveAwayModalRoot open={open} onClose={() => setOpen(false)} {...rest}>
      <GiveAwayModalHeader>
        <GiveAwayModalHeaderBackground />
        <img src={present} alt="present" css={{ width: '15.12rem', height: '15.12rem' }} />
      </GiveAwayModalHeader>
      <GiveAwayModalBody>
        <Col gap="0.5rem">
          <Typography variant="h3">{translate('giveAwayModalTitle')}</Typography>
          <Typography variant="body1" fontWeight={400} light>
            {translate('giveAwayModalBodyTitle')}
          </Typography>
          <Typography variant="body1" fontWeight={400} light>
            {translate('giveAwayModalBodyTitle1')}
          </Typography>
          <Typography variant="body1" fontWeight={400} light>
            {translate('giveAwayModalBodyTitle2')}
          </Typography>
        </Col>
        <GiveAwayFooterCard>
          <Col>
            <GiveAwayFooterCardContent>
              <Col gap="0.25rem">
                <Typography variant="body2" light>
                  {translate('promoCode')}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {promoCode}
                </Typography>
              </Col>
              <Button size="sm" variant="tertiary" onClick={handleCopyCode}>
                {translate('copyCode')}
              </Button>
            </GiveAwayFooterCardContent>
            <ExternalLink to={surveyUrl} css={{ width: '100%' }}>
              <Button fullWidth>{translate('giveAwayModalButton')}</Button>
            </ExternalLink>
          </Col>
        </GiveAwayFooterCard>
      </GiveAwayModalBody>
    </GiveAwayModalRoot>
  );
}

export default GiveAwayModal;
