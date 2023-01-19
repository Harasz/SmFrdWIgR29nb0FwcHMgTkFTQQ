import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Get pictures URL from a given date range.
   * @param {string} from - the start date.
   * @param {string} to - the end date.
   * @returns {Promise<string[]>} the pictures URL.
   */
  async getPicturesByDateRange(from: string, to: string): Promise<string[]> {
    return ['picture1', 'picture2', 'picture3'];
  }
}
