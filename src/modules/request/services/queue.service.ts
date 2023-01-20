import { Injectable } from '@nestjs/common';
import { RequestObject } from '../interfaces/request-object';

@Injectable()
export class RequestQueueService {
  private readonly queue: RequestObject[] = [];

  /**
   * Gets the length of the queue.
   * @returns {number} - the length of the queue.
   */
  get length(): number {
    return this.queue.length;
  }

  /**
   * Pushes a request object to the queue.
   * @param {RequestObject} requestObject - the request object to push.
   */
  push(requestObject: RequestObject): void {
    this.queue.push(requestObject);
  }

  /**
   * Pops a request object from the queue.
   * @returns {RequestObject | undefined} - the request object popped from the queue. If the queue is empty, returns undefined.
   *
   */
  pop(): RequestObject | undefined {
    return this.queue.shift();
  }
}
