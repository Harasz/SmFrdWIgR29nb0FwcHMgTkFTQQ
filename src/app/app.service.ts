import { Inject, Injectable } from '@nestjs/common';
import {
  ImageProvider,
  IMAGE_PROVIDER_TOKEN,
} from '../providers/image-provider.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject(IMAGE_PROVIDER_TOKEN) private readonly imageProvider: ImageProvider,
  ) {}

  /**
   * Get pictures URL from a given date range.
   * @param {string} from - the start date.
   * @param {string} to - the end date.
   * @returns {Promise<string[]>} the pictures URL.
   */
  async getPicturesByDateRange(from: string, to: string): Promise<string[]> {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    return await this.imageProvider.getImages(fromDate, toDate);
  }
}
