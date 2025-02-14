import { Col, Row, Typography } from '@peersyst/react-components';
import clsx from 'clsx';
import type { SendParams } from 'common/models/transaction/send.types';
import { useState, useEffect, useRef } from 'react';
import { CloseIcon } from 'ui/common/icons';
import { useTranslate } from 'ui/locale';
import { SendModalLoading, SendModalSuccess, SendModalError } from 'ui/transaction/container/SendModal/SendModalFeedback';
import { SendModalForm } from 'ui/transaction/container/SendModal/SendModalForm';
import TrustLineModalForm from 'ui/transaction/container/TrustLineModal/TrustLineModalForm';
import useSend from 'ui/transaction/query/useSend';

import {
  WalletConsoleRoot,
  WalletConsoleTab,
  WalletConsoleContent,
  CollapseButton,
  SectionHeader,
  SectionContainer,
  SectionContent,
  ChevronIcon,
} from './WalletConsole.styles';
import { useWalletConsoleState } from './WalletConsoleState';
import WalletDropdown from './WalletDropdown';

export interface WalletConsoleProps {
  className?: string;
}

const WalletConsole = ({ className }: WalletConsoleProps): JSX.Element => {
  const { isExpanded, setIsExpanded } = useWalletConsoleState();
  const [isVisible, setIsVisible] = useState(false);
  const [isWalletExpanded, setIsWalletExpanded] = useState(true);
  const [isSendExpanded, setIsSendExpanded] = useState(false);
  const [isTrustLineExpanded, setIsTrustLineExpanded] = useState(false);
  const translate = useTranslate();
  const { mutate, isPending, isSuccess, isError, error, data: txHash = '', reset } = useSend();
  const contentRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded) {
      setIsVisible(true);
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        tabRef.current &&
        !tabRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, setIsExpanded]);

  const handleTransitionEnd = () => {
    if (!isExpanded) {
      setIsVisible(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendSubmit = (params: SendParams) => {
    const sendParams: SendParams = { ...params };
    // Only include destinationTag if it's a valid integer
    if (params.destinationTag !== undefined) {
      const tag = Number(params.destinationTag);
      if (!isNaN(tag) && Number.isInteger(tag) && tag >= 0) {
        sendParams.destinationTag = tag;
      }
    }
    // Remove destinationTag if it's not a valid non-negative integer
    if (typeof sendParams.destinationTag !== 'number' || !Number.isInteger(sendParams.destinationTag) || sendParams.destinationTag < 0) {
      delete sendParams.destinationTag;
    }
    mutate(sendParams);
  };

  const handleSendClose = () => {
    setIsSendExpanded(false);
    reset();
  };

  const handleTrustLineClose = () => {
    setIsTrustLineExpanded(false);
  };

  const handleSectionExpand = (section: 'wallet' | 'send' | 'trustLine') => {
    switch (section) {
      case 'wallet':
        setIsWalletExpanded(!isWalletExpanded);
        if (!isWalletExpanded) {
          setIsSendExpanded(false);
          setIsTrustLineExpanded(false);
        }
        break;
      case 'send':
        setIsSendExpanded(!isSendExpanded);
        if (!isSendExpanded) {
          setIsWalletExpanded(false);
          setIsTrustLineExpanded(false);
        }
        break;
      case 'trustLine':
        setIsTrustLineExpanded(!isTrustLineExpanded);
        if (!isTrustLineExpanded) {
          setIsWalletExpanded(false);
          setIsSendExpanded(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {!isVisible && (
        <WalletConsoleTab ref={tabRef} onClick={toggleExpanded}>
          <Typography variant="body1" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            {translate('openConsole')}
          </Typography>
        </WalletConsoleTab>
      )}
      {isVisible && (
        <WalletConsoleRoot
          className={clsx(className, { expanded: isExpanded })}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) {
              setIsExpanded(false);
            }
          }}
        >
          <WalletConsoleContent ref={contentRef} className={clsx({ expanded: isExpanded })} onTransitionEnd={handleTransitionEnd}>
            <Row justifyContent="space-between" alignItems="center" style={{ padding: '1rem' }}>
              <Typography variant="h6">{translate('openConsole')}</Typography>
              <CollapseButton onClick={toggleExpanded}>
                <CloseIcon />
              </CollapseButton>
            </Row>
            <Col gap="1.5rem" style={{ padding: '0 1rem' }}>
              <SectionContainer>
                <SectionHeader onClick={() => handleSectionExpand('wallet')} $isExpanded={isWalletExpanded}>
                  <Typography variant="body1">Wallet</Typography>
                  <ChevronIcon $isExpanded={isWalletExpanded} />
                </SectionHeader>
                <SectionContent $isExpanded={isWalletExpanded}>
                  <WalletDropdown />
                </SectionContent>
              </SectionContainer>

              <SectionContainer>
                <SectionHeader onClick={() => handleSectionExpand('send')} $isExpanded={isSendExpanded}>
                  <Typography variant="body1">Send</Typography>
                  <ChevronIcon $isExpanded={isSendExpanded} />
                </SectionHeader>
                <SectionContent $isExpanded={isSendExpanded}>
                  {isPending && <SendModalLoading />}
                  {!isPending && !isSuccess && !isError && <SendModalForm onSubmit={handleSendSubmit} onCancel={handleSendClose} />}
                  {isSuccess && <SendModalSuccess txHash={txHash} onClose={handleSendClose} />}
                  {isError && <SendModalError error={error} onClose={handleSendClose} />}
                </SectionContent>
              </SectionContainer>

              <SectionContainer>
                <SectionHeader onClick={() => handleSectionExpand('trustLine')} $isExpanded={isTrustLineExpanded}>
                  <Typography variant="body1">Add Token/Trust Line</Typography>
                  <ChevronIcon $isExpanded={isTrustLineExpanded} />
                </SectionHeader>
                <SectionContent $isExpanded={isTrustLineExpanded}>
                  <TrustLineModalForm onClose={handleTrustLineClose} />
                </SectionContent>
              </SectionContainer>
            </Col>
          </WalletConsoleContent>
        </WalletConsoleRoot>
      )}
    </>
  );
};

export default WalletConsole;
