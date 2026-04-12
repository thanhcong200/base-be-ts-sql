import { LANGUAGE } from '@common/enums';
import { URL_NOT_FOUND } from '@constant/error-messages';
import { CHARACTER_SEPARATE_SUB_INFO } from '@constant/index';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import i18n from '../../service/i18n';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  async use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const ip = (req.headers['x-forwarded-for'] || req.ip || '').toString().replace('::ffff:', '');
    const hostname = req.get('origin') ? `${req.get('origin')}/` : `${req.protocol}://${req.get('host')}/`;
    const domain = hostname.split('://')[1].split(':')[0];

    req.headers.device = Object.assign(
      { browser: '' },
      req.headers.device ? JSON.parse((req.headers.device || '').toString()) : '',
      {
        ip,
        userAgent: `${(req.headers['sec-ch-ua'] || '').toString().replace(/"/g, '')}${CHARACTER_SEPARATE_SUB_INFO}${
          req.headers['user-agent']
        }`,
      },
    );

    req.headers.hostname = hostname;
    req.headers.domain = domain;
    req.headers.ip = ip;
    // if (!req.headers['accept-language'])
    req.headers['accept-language'] = LANGUAGE.EN;
    i18n.setLocale(req.headers['accept-language']);

    if (originalUrl.indexOf('/api/') == -1 && originalUrl.indexOf('/upload/') == -1) {
      return res.json({ error: 404, message: URL_NOT_FOUND });
    }

    console.log('log request...', originalUrl, 'language', req.headers['accept-language']);

    this.logger.log(
      JSON.stringify({
        method,
        url: originalUrl,
        IP: ip,
        header: { authorization: req.headers.authorization },
        body: req.body,
      }),
    );
    return next();
  }
}
