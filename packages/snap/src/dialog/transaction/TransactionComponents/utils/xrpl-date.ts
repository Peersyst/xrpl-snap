import { rippleTimeToUnixTime } from 'xrpl';

import { translateDate } from '../../../locale/translate';

export const formatRippleTime = (rippleTime: number): string => {
  const unixTime = rippleTimeToUnixTime(rippleTime);
  return translateDate(new Date(unixTime));
};
