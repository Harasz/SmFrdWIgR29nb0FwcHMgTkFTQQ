import { Injectable, Logger } from '@nestjs/common';
import { endOfDay, format, startOfDay, eachDayOfInterval } from 'date-fns';
import { RequestService } from '../../modules';
import { ImageProvider } from '../image-provider.interface';
import { ApiResponse } from './interfaces';

@Injectable()
export class NasaApodService implements ImageProvider {
  constructor(private readonly requestService: RequestService) {}

  /**
   * Get images from NASA APOD API in given date range.
   * @param {Date} from - start date of range
   * @param {Date} to - end date of range
   * @returns {Promise<string[]>} - array of image urls
   */
  async getImages(from: Date, to: Date): Promise<string[]> {
    const dateRanges = this.getDateRanges(startOfDay(from), endOfDay(to));

    const responses: (ApiResponse | undefined)[] = await Promise.all(
      dateRanges.map(async (date) => {
        Logger.debug(`Requesting image for date: ${date}`, 'NASA APOD API');
        return await this.requestService.processRequest<ApiResponse>({
          method: 'get',
          url: '/planetary/apod',
          queryParams: {
            date,
            thumbs: true,
          },
        });
      }),
    );

    const urls = responses
      .filter((response) => !!response)
      .map(this.extractUrlFromResponse);

    return urls;
  }

  /**
   * Extract image url from response
   * @param {ApiResponse} response - response from NASA APOD API
   * @returns {string} - image url
   */
  private extractUrlFromResponse(response: ApiResponse): string {
    return response.hdurl ?? response.thumbnail_url ?? response.url;
  }

  /**
   * Get date ranges between from and to
   * @param {Date} start - start date of range
   * @param {Date} end - end date of range
   * @returns {string[]} - array of date ranges
   */
  private getDateRanges(start: Date, end: Date): string[] {
    return eachDayOfInterval({
      start,
      end,
    }).map((date) => this.formatDate(date));
  }

  /**
   * Format date to YYYY-MM-DD
   * @param {Date} date - date to format
   * @returns {string} - formatted date
   */
  private formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }
}
