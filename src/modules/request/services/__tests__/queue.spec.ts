import { Test } from '@nestjs/testing';
import { RequestObject } from '../../interfaces/request-object';
import { RequestQueueService } from '../queue.service';

describe('Request MODULE / Request Queue Service', () => {
  let requestQueueService: RequestQueueService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RequestQueueService],
    }).compile();

    requestQueueService = moduleRef.get(RequestQueueService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('push()', () => {
    it('should push a request object to the queue', () => {
      const requestObject = RequestObject.fromRequestOptions({
        method: 'get',
        url: '/test',
      });
      requestQueueService.push(requestObject);
      expect(requestQueueService.length).toEqual(1);
      expect(requestQueueService.pop()).toEqual(requestObject);
    });

    it('should push a multiple request objects to the queue', () => {
      const requestObject = RequestObject.fromRequestOptions({
        method: 'get',
        url: '/test',
      });
      const requestObject2 = RequestObject.fromRequestOptions({
        method: 'get',
        url: '/test',
      });
      requestQueueService.push(requestObject, requestObject2);
      expect(requestQueueService.length).toEqual(2);
    });
  });

  describe('pop()', () => {
    it('should pop a first added object to the queue', () => {
      const requestObject = RequestObject.fromRequestOptions({
        method: 'get',
        url: '/test',
      });
      const requestObject1 = RequestObject.fromRequestOptions({
        method: 'post',
        url: '/test',
      });

      requestQueueService.push(requestObject);
      requestQueueService.push(requestObject1);

      expect(requestQueueService.length).toEqual(2);
      expect(requestQueueService.pop()).toEqual(requestObject);
    });

    it('should pop objects in correct order', () => {
      const requestObject = RequestObject.fromRequestOptions({
        method: 'get',
        url: '/test',
      });
      const requestObject1 = RequestObject.fromRequestOptions({
        method: 'post',
        url: '/test',
      });

      requestQueueService.push(requestObject);
      requestQueueService.push(requestObject1);

      expect(requestQueueService.length).toEqual(2);
      expect(requestQueueService.pop()).toEqual(requestObject);
      expect(requestQueueService.length).toEqual(1);
      expect(requestQueueService.pop()).toEqual(requestObject1);
    });

    it('should return undefined when the queue is empty', () => {
      expect(requestQueueService.length).toEqual(0);
      expect(requestQueueService.pop()).toBeUndefined();
    });
  });
});
