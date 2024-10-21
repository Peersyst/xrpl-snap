import { GiveAwayRepository } from 'data-access/repository/give-away/GiveAwayRepository';

export class GiveAwayController {
  constructor(private readonly giveAwayRepository: GiveAwayRepository) {}

  async getPomoCode(address: string): Promise<string> {
    return this.giveAwayRepository.getPromoCode(address);
  }
}
