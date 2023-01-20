export interface RequestOptions {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';
  url: string;
  queryParams?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  body?: Record<string, string>;
}
