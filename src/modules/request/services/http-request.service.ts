import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RequestObject } from '../interfaces/request-object';
import { MODULE_OPTIONS_TOKEN } from '../config/request.module-builder';
import { RequestModuleOptions } from '../config/request.options';

@Injectable()
export class HttpRequestService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly moduleOptions: RequestModuleOptions,
  ) {}

  /**
   * Sends a request to the API.
   * @param {RequestObject} requestObject - the request object to send.
   * @returns {Promise<unknown>} - the response data.
   */
  async sendRequest(requestObject: RequestObject): Promise<unknown> {
    const request = this.httpService.request({
      baseURL: this.moduleOptions.apiUrl,
      url: requestObject.data.url,
      method: requestObject.data.method,
      headers: {
        ...requestObject.data.headers,
        ...(this.moduleOptions.extraHeaders ?? {}),
      },
      params: {
        ...requestObject.data.queryParams,
        ...(this.moduleOptions.extraQueryParams ?? {}),
      },
      data: requestObject.data.body,
    });

    try {
      const response = await firstValueFrom(request);
      return response.data;
    } catch (error) {
      Logger.error(error, 'HttpRequestService');
      return undefined;
    }
  }
}
