import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetPicturesParams, PicturesResultDto } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint to get pictures URL from a given date range.
   * @param {GetPicturesParams} queryParams - the query parameters.
   */
  @Get('/pictures')
  async getPictures(
    @Query() queryParams: GetPicturesParams,
  ): Promise<PicturesResultDto> {
    const urls = await this.appService.getPicturesByDateRange(
      queryParams.from,
      queryParams.to,
    );
    return PicturesResultDto.fromPictures(urls);
  }
}
