import { Module } from '@nestjs/common';
import { RequestModule } from '../../modules';
import { IMAGE_PROVIDER_TOKEN } from '../image-provider.interface';
import { NasaApodConfigModuleOptionsFactory } from './config/nasa-apod-request.config';
import { NasaApodService } from './nasa-apod.service';

const NasaApodProviderToken = {
  provide: IMAGE_PROVIDER_TOKEN,
  useClass: NasaApodService,
};

@Module({
  imports: [
    RequestModule.registerAsync({
      useClass: NasaApodConfigModuleOptionsFactory,
    }),
  ],
  providers: [NasaApodProviderToken],
  exports: [NasaApodProviderToken],
})
export class NasaApodProvider {}
