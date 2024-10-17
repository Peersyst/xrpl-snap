import { config } from 'common/config';

import RepositoryError from '../error/RepositoryError';
import { GiveAwayRepositoryErrorCodes } from './GiveAwayRepositoryErrorCodes';

export class GiveAwayRepository {
  async getPromoCode(address: string): Promise<string> {
    try {
      const res = await fetch(`${config.backendUrl}/api/promo-code`, {
        method: 'POST',
        body: JSON.stringify({ address }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        return await res.text();
      }
      throw new RepositoryError(GiveAwayRepositoryErrorCodes.FAILED_TO_GET_GIVE_AWAY);
    } catch (e) {
      throw new RepositoryError(GiveAwayRepositoryErrorCodes.FAILED_TO_GET_GIVE_AWAY);
    }
  }
}
