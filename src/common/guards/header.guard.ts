import {encryptDevice} from '@common/utils';
import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';

@Injectable()
export class HeaderGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const hostname = req.get('origin') ? `${req.get('origin')}/` : `${req.protocol}://${req.get('host')}/`;
    const domain = hostname.split('://')[1].split(':')[0];

    if (!req.info) req.info = {};
    req.info.device_hash = encryptDevice(domain, req.headers.device);

    req.info.ip = req.headers.ip;
    req.info.domain = domain;
    req.info.host = hostname;
    req.info.url = req.originalUrl;
    req.info.language = req.headers['accept-language'];
    return true;
  }
}
