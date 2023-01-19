import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Catch HttpException
    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      response.status(status).json({
        error: this.extractMessageFromHttpException(exception),
      });
      return;
    }

    response.status(500).json({
      error: `${exception.message}`,
    });
  }

  private extractMessageFromHttpException(exception: HttpException): string {
    const exceptionResponseObject = exception.getResponse();

    if (typeof exceptionResponseObject === 'string') {
      return exceptionResponseObject;
    }

    if ('message' in exceptionResponseObject) {
      if (Array.isArray(exceptionResponseObject.message)) {
        return exceptionResponseObject.message.join(', ');
      }
      return exceptionResponseObject.message as string;
    }

    return 'Internal server error';
  }
}
