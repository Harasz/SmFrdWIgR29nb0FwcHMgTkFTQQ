import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import * as nock from 'nock';
import { MODULE_OPTIONS_TOKEN } from '../../config/request.module-builder';
import { RequestObject } from '../../interfaces/request-object';
import { HttpRequestService } from '../http-request.service';

describe('Request MODULE / HTTP Request Service', () => {
  let httpRequestService: HttpRequestService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        HttpRequestService,
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: {
            apiUrl: 'https://example.com',
          },
        },
      ],
    }).compile();

    httpRequestService = moduleRef.get(HttpRequestService);
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  describe('sendRequest()', () => {
    it('should send a request and return valid response', async () => {
      const baseURL = 'https://example.com';
      const url = '/test';

      nock(baseURL).get(url).reply(200, {
        id: 1,
      });

      const requestObject = RequestObject.fromRequestOptions({
        method: 'get',
        url,
      });

      const response = await httpRequestService.sendRequest(requestObject);
      expect(response).toEqual({ id: 1 });
    });

    it('should send a request and return nothing when error occurred', async () => {
      const baseURL = 'https://example.com';
      const url = '/test';

      nock(baseURL).get(url).reply(500);

      const requestObject = RequestObject.fromRequestOptions({
        method: 'get',
        url,
      });

      const response = await httpRequestService.sendRequest(requestObject);
      expect(response).toBeUndefined();
    });

    it('should send a request with additional headers', async () => {
      const baseURL = 'https://example.com';
      const url = '/test';

      nock(baseURL, {
        reqheaders: {
          'X-Test': 'test',
        },
      })
        .get(url)
        .reply(200, { success: true });

      const requestObject = RequestObject.fromRequestOptions({
        method: 'get',
        url,
        headers: {
          'X-Test': 'test',
        },
      });

      const response = await httpRequestService.sendRequest(requestObject);
      expect(response).toBeTruthy();
    });

    it('should send a request with additional query params', async () => {
      const baseURL = 'https://example.com';
      const url = '/test';

      nock(baseURL).get(`${url}?test=test`).reply(200, { success: true });

      const requestObject = RequestObject.fromRequestOptions({
        method: 'get',
        url,
        queryParams: {
          test: 'test',
        },
      });

      const response = await httpRequestService.sendRequest(requestObject);
      expect(response).toBeTruthy();
    });

    it('should send a request with additional body', async () => {
      const baseURL = 'https://example.com';
      const url = '/test';

      nock(baseURL)
        .post(url, {
          test: 'test',
        })
        .reply(200, { success: true });

      const requestObject = RequestObject.fromRequestOptions({
        method: 'post',
        url,
        body: {
          test: 'test',
        },
      });

      const response = await httpRequestService.sendRequest(requestObject);
      expect(response).toBeTruthy();
    });
  });
});
