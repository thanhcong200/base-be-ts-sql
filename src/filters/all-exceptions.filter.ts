import { DATA_TYPE } from '@common/enums';
import { validateDatatype } from '@common/utils/index';

import { SYSTEM_ERROR } from '@constant/error-messages';
import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

// Error responses now use error codes (ERROR_CODE enum) rather than i18n translation strings.
// We intentionally avoid translating error messages here so the API consistently returns codes.

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  // constructor(
  //   @InjectPinoLogger(AllExceptionsFilter.name)
  //   private readonly logger1: PinoLogger,
  // ) {

  // }

  private readonly logger = new Logger(AllExceptionsFilter.name);

  async catch(exception: any, host: ArgumentsHost) {
    //HttpException
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { body } = request;
    const { query, method, url } = request;
    const response = <any>ctx.getResponse<Response>();
    const ignoreRoute = ['/api/v1/auth/login'];

    const requestInfo = {
      method,
      url,
      body,
      query,
      ip: (request.headers['x-forwarded-for'] || request.ip || '').toString().replace('::ffff:', ''),
    };
    if (ignoreRoute.includes(url)) requestInfo.body = {};

    if (exception?.stack) exception.stack = exception.stack.split('\n    at ')[1] || '';

    const status = this.getStatusCode(exception);
    const { message, logTag } = this.getMessageError(exception);
    const logData = {
      tag: logTag,
      url: url,
      exception: exception || '',
      request: requestInfo,
    };
    const responseData = {
      reason: exception?.response?.reason,
      message: message,
      statusCode: status,
    };

    this.standardizeLogger(logData);
    return response.status(status).json(responseData);
  }
  getStatusCode(exception) {
    return exception instanceof HttpException
      ? exception.getStatus()
      : exception?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  }
  getMessageErrorHttpException(exception: HttpException) {
    const exceptionObject: any = exception.getResponse();
    let message = validateDatatype(exceptionObject.message, DATA_TYPE.STRING)
      ? exceptionObject.message
      : exceptionObject.message[0];
    // Do not translate here; message may already be an error code (eg. ERROR_CODE.*)
    return message;
  }
  getMessageError(exception: any) {
    let logTag = 'NORMAL';
    let message = SYSTEM_ERROR;
    try {
      console.log(exception.stack);
      if (exception instanceof HttpException) {
        logTag = 'HttpException';
        message = this.getMessageErrorHttpException(exception);
      } else if (exception instanceof Error) {
        logTag = 'Error';
        message = exception.message; // keep raw message (could be code or plain text)
      } else {
        if (validateDatatype(exception, DATA_TYPE.OBJECT)) {
          message = exception.message || message;
          // keep as-is; if a code is used, it will be returned to the client
        } else {
          message = exception || message;
        }
      }
    } catch (error) {
      console.log('error');
    }
    return { message, logTag };
  }
  standardizeLogger(logData) {
    this.logger.error(
      JSON.stringify({
        type: logData.tag,
        date: new Date(),
        exception: logData.exception.stack,
        message: logData.exception.message,
        apiPath: logData.url,
        request: logData.request,
      }),
    );
  }
}
