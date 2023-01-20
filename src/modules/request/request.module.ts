import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigurableModuleClass } from './config/request.module-builder';
import { RequestQueueService } from './services/queue.service';
import { HttpRequestService } from './services/http-request.service';
import { RequestService } from './services/request.service';

@Module({
  imports: [HttpModule],
  providers: [RequestQueueService, HttpRequestService, RequestService],
  exports: [RequestService],
})
export class RequestModule extends ConfigurableModuleClass {}
