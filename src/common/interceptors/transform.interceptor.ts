import { camelCaseToSnakeCase, i18nMsg, setDefaulSort, snakeCaseToCamelCase, success } from '@common/utils/index';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  statusCode: number;
  logout?: boolean;
  message?: string;
  timestamp?: number;
  meta?: {};
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Observable<Response<T>>
    const req = context.switchToHttp().getRequest();


    return next.handle().pipe(
      map((payload) => {
        const statusCodeResponse = context.switchToHttp().getResponse().statusCode;

        switch (typeof payload) {
          case 'object':
            const { data, message, logout, meta, timestamp, statusCode, validation, fieldName, trans_ref, ...output } =
              payload;
            if (output && output.socket) {
              return payload;
            }
            let resultData = data || output;
            if (payload.constructor === Array) {
              resultData = payload;
            }

            const response = {
              data: resultData,
              logout,
              message: !validation ? i18nMsg(message) : message || i18nMsg(message),
              timestamp,
              meta,
              fieldName,
              trans_ref,
              statusCode: !validation ? statusCodeResponse : statusCode || statusCodeResponse,
            };

            Object.keys(response).forEach((key) => !response[key] && delete response[key]);
            return success(snakeCaseToCamelCase(response));

          case 'undefined':
            return success({ statusCode: statusCodeResponse });
          default:
            return payload;
        }
      }),
    );
  }
}
