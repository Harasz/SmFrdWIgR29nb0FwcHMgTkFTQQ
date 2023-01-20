import { randomUUID } from 'crypto';
import { RequestOptions } from './request-options';

export class RequestObject {
  public readonly data: Required<RequestOptions>;
  public readonly id: string;

  private constructor(data: Required<RequestOptions>, id: string) {
    this.data = data;
    this.id = id;
  }

  static fromRequestOptions(requestOptions: RequestOptions): RequestObject {
    const instance = new RequestObject(
      {
        queryParams: requestOptions.queryParams || {},
        headers: requestOptions.headers || {},
        body: requestOptions.body || {},
        method: requestOptions.method,
        url: requestOptions.url,
      },
      randomUUID(),
    );
    return instance;
  }
}
