import { translateDate } from '../../../locale/translate';

const RIPPLE_EPOCH_DIFF = 0x386d4380;

/**
 * Convert a ripple timestamp to a unix timestamp.
 *
 * @param rpepoch - (seconds since 1/1/2000 GMT).
 * @returns Milliseconds since unix epoch.
 * @category Utilities
 */
function rippleTimeToUnixTime(rpepoch: number): number {
  return (rpepoch + RIPPLE_EPOCH_DIFF) * 1000;
}

export const formatRippleTime = (rippleTime: number): string => {
  const unixTime = rippleTimeToUnixTime(rippleTime);
  return translateDate(new Date(unixTime));
};
