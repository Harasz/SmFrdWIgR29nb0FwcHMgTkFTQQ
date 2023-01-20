import { Injectable } from '@nestjs/common';
import {
  RequestModuleOptions,
  RequestModuleOptionsFactory,
} from '../../../modules';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../config';

@Injectable()
export class NasaApodConfigModuleOptionsFactory
  implements RequestModuleOptionsFactory
{
  private readonly appConfig: AppConfig;

  constructor(configService: ConfigService) {
    this.appConfig = new AppConfig(configService);
  }

  createRequestOptions(): RequestModuleOptions {
    return {
      apiUrl: 'https://api.nasa.gov/',
      maxConcurrencyRequests: this.appConfig.apiConcurrentRequests,
      extraQueryParams: {
        api_key: this.appConfig.apiKey,
      },
    };
  }
}
