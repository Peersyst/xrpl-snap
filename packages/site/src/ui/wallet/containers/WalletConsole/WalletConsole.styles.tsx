import styled from 'styled-components';
import { ChevronDownIcon } from 'ui/common/icons';

export const WalletConsoleRoot = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  background-color: ${({ theme }) => `${theme.palette.grey[900]}50`};
  z-index: 1000;
  pointer-events: none;

  &.expanded {
    pointer-events: auto;
  }
`;

export const WalletConsoleContent = styled.div`
  position: relative;
  width: 400px;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background};
  border-left: 1px solid ${({ theme }) => theme.palette.grey[200]};
  overflow-y: auto;
  overflow-x: hidden;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  pointer-events: auto;
  box-sizing: border-box;

  &.expanded {
    transform: translateX(0);
  }

  ${({ theme }) => theme.breakpoints.down('mobile')} {
    width: 100%;
  }
`;

export const WalletConsoleTab = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.palette.background};
  border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  border-right: none;
  border-radius: 8px 0 0 8px;
  padding: 1rem 0.5rem;
  cursor: pointer;
  z-index: 999;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[100]};
  }
`;

export const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[100]};
  }
`;

export const SectionContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
  box-sizing: border-box;
  width: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.palette.grey[300]};
  }
`;

export const SectionHeader = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.background};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey[100]};
  }
`;

export const SectionContent = styled.div<{ $isExpanded: boolean }>`
  max-height: ${({ $isExpanded }) => ($isExpanded ? '1000px' : '0')};
  opacity: ${({ $isExpanded }) => ($isExpanded ? '1' : '0')};
  overflow: visible;
  transition: all 0.3s ease;
  padding: ${({ $isExpanded }) => ($isExpanded ? '0 1rem 1rem' : '0 1rem')};
  box-sizing: border-box;
  width: 100%;
`;

export const ChevronIcon = styled(ChevronDownIcon)<{ $isExpanded: boolean }>`
  transform: ${({ $isExpanded }) => ($isExpanded ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.2s ease;
`;
