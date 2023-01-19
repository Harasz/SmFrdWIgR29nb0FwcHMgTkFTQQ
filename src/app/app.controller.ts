import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetPicturesParams } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint to get pictures URL from a given date range.
   * @param {GetPicturesParams} queryParams - the query parameters.
   * @returns {string}
   */
  @Get('/pictures')
  getPictures(@Query() queryParams: GetPicturesParams): string {
    return this.appService.getHello();
  }
}
