import snapState from 'domain/snap/state/snapState';
import { useStore } from 'zustand';

export default function useSnapState() {
  return useStore(snapState);
}
