import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let errorResponse: any = { message: 'Internal server error' };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      errorResponse = typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : exceptionResponse;
    } else if (exception instanceof Error) {
      errorResponse = { message: exception.message };
    }

    response.status(status).json({
      ...errorResponse,
      timestamp: new Date().toISOString(),
    });
  }
}