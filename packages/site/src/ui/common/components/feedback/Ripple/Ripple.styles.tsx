import styled, { css, keyframes } from 'styled-components';

// Ripple animation
const rippleAnimation = keyframes`
    0% {
        transform: translate(-50%, -50%) scale(1);
    }
    50% {
        transform: translate(-50%, -50%) scale(0.9);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
    }
`;

export const RippleRoot = styled.div<{ mobile: boolean }>`
  position: absolute;
  inset: 1px;
`;

export const RippleCircle = styled.div<{ top: string; size: number; opacity: number; delay: string }>(
  ({ top, size, opacity, delay }) => css`
    position: absolute;
    top: ${top};
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${size}px;
    height: ${size}px;
    opacity: ${opacity};
    background-color: #32e685;
    border: 1px solid #32e685;
    border-radius: 50%;
    animation: ${rippleAnimation} var(--duration, 2s) ease calc(var(--i, 0) * 0.2s) infinite;
    animation-delay: ${delay};
  `,
);
