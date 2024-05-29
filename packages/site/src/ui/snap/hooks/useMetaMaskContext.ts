import { useContext } from 'react';
import { MetaMaskContext } from '../MetamaskContext';

/**
 * Utility hook to consume the MetaMask context.
 *
 * @returns The MetaMask context.
 */
export function useMetaMaskContext() {
  return useContext(MetaMaskContext);
}
