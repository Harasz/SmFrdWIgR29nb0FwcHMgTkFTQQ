export interface RequestModuleOptions {
  apiUrl: string;
  maxConcurrencyRequests: number;
  extraHeaders?: Record<string, string>;
  extraQueryParams?: Record<string, string>;
}
