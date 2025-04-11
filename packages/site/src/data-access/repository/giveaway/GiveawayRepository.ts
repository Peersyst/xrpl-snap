import config from 'common/config/config';

export class GiveawayRepository {
  public async storeAddress(address: string): Promise<void> {
    try {
      await fetch(`${config.backendUrl}/api/galxe/register`, {
        method: 'POST',
        body: JSON.stringify({ address }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {}
  }
}
