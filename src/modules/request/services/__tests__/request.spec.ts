import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import * as util from 'util';
import * as nock from 'nock';
import { EventEmitter } from 'node:events';
import { MODULE_OPTIONS_TOKEN } from '../../config/request.module-builder';
import { HttpRequestService } from '../http-request.service';
import { RequestQueueService } from '../queue.service';
import { RequestService } from '../request.service';

describe('Request MODULE / Request Service', () => {
  let requestService: RequestService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        RequestService,
        HttpRequestService,
        RequestQueueService,
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: {
            apiUrl: 'http://example.com',
            maxConcurrencyRequests: 2,
          },
        },
      ],
    }).compile();

    requestService = moduleRef.get(RequestService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  describe('processRequest()', () => {
    it('should process max 2 requests at the same time', async () => {
      const eventEmitter = new EventEmitter();
      let activeRequests = 0;
      const scope = nock('http://example.com')
        .get('/test')
        .thrice()
        .reply((uri, requestBody, cb) => {
          activeRequests += 1;
          eventEmitter.once('reply', () => {
            activeRequests -= 1;
            cb(null, [200, 'OK']);
          });
        });

      const request1 = requestService.processRequest({
        url: '/test',
        method: 'get',
      });
      const request2 = requestService.processRequest({
        url: '/test',
        method: 'get',
      });
      const request3 = requestService.processRequest({
        url: '/test',
        method: 'get',
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      expect(scope.isDone()).toBeFalsy();
      expect(activeRequests).toBe(2);

      eventEmitter.emit('reply');
      const [response1, response2] = await Promise.all([request1, request2]);

      expect(response1).toBe('OK');
      expect(response2).toBe('OK');
      expect(util.inspect(request3).includes('pending')).toBeTruthy();

      await new Promise((resolve) => setTimeout(resolve, 500));

      expect(activeRequests).toBe(1);

      eventEmitter.emit('reply');
      expect(scope.isDone()).toBeTruthy();
      expect(activeRequests).toBe(0);

      expect(response1).toBe('OK');
      expect(response2).toBe('OK');
    });
  });
});
