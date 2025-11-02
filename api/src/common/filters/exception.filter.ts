import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(e: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(e);
    let status =
      e instanceof HttpException
        ? e.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';

    // 🌐 Handle HttpExceptions
    if (e instanceof HttpException) {
      const res: any = e.getResponse();
      if (typeof res === 'object') {
        message = res.message || message;
      } else {
        message = res;
      }
    }

    // 🔍 Handle Prisma errors
    if (e instanceof PrismaClientKnownRequestError) {
      switch (e.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'An account with this email address already exists.';
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = 'Invalid foreign key: referenced record does not exist.';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'The requested record was not found.';
          break;
        default:
          message = e.message;
          break;
      }
    }

    // Final structured response
    response.status(status).json({
      code: status,
      status: false,
      data: null,
      message,
    });
  }
}
