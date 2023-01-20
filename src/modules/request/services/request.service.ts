import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter } from 'node:events';
import { MODULE_OPTIONS_TOKEN } from '../config/request.module-builder';
import { RequestModuleOptions } from '../config/request.options';
import { RequestObject } from '../interfaces/request-object';
import { RequestOptions } from '../interfaces/request-options';
import { RequestQueueService } from './queue.service';
import { HttpRequestService } from './http-request.service';

@Injectable()
export class RequestService {
  private readonly eventEmitter = new EventEmitter();
  private pendingRequests = 0;

  constructor(
    private readonly queue: RequestQueueService,
    private readonly requestService: HttpRequestService,
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly moduleOptions: RequestModuleOptions,
  ) {}

  /**
   * Sends a request to the API and returns a promise with the response data.
   * @param {RequestOptions} options - the request options.
   * @returns {Promise<T | undefined>} - the response data.
   * @template T - the type of the response data.
   */
  async processRequest<ResponseType>(
    options: RequestOptions,
  ): Promise<ResponseType | undefined> {
    const requestObject = RequestObject.fromRequestOptions(options);
    this.queue.push(requestObject);
    this.processQueue();

    return new Promise((resolve) => {
      this.eventEmitter.once(requestObject.id, (data: ResponseType) => {
        resolve(data);
      });
    });
  }

  /**
   * Processes the next request in the queue. If the limit of concurrent requests is reached, it does nothing.
   */
  private async processQueue(): Promise<void> {
    // If the limit of concurrent requests is reached, do nothing.
    if (this.pendingRequests >= this.moduleOptions.maxConcurrencyRequests) {
      return;
    }

    // If the queue is empty, do nothing.
    if (this.queue.length === 0) {
      return;
    }

    // Get the next request object from the queue.
    const requestObject = this.queue.pop();
    await this.processRequestObject(requestObject);

    // Process the next request.
    if (this.queue.length > 0) {
      this.processQueue();
    }
  }

  /**
   * Sends a request to the API and emits the event with the response data.
   * @param {RequestObject} requestObject - the request object to send.
   */
  private async processRequestObject(
    requestObject: RequestObject,
  ): Promise<void> {
    this.pendingRequests += 1;
    const requestResponse = await this.requestService.sendRequest(
      requestObject,
    );
    this.pendingRequests -= 1;

    // Emit the event with the response data.
    this.eventEmitter.emit(requestObject.id, requestResponse);
  }
}
