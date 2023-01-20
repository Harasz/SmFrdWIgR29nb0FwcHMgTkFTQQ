import { RequestModuleOptions } from './request.options';

export interface RequestModuleOptionsFactory {
  createRequestOptions(): Promise<RequestModuleOptions> | RequestModuleOptions;
}
