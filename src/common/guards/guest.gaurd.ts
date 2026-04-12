import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { USER_CLIENT } from '@common/enums';
import { encryptDevice } from '@common/utils';
import { AUTH_FAIL } from '@constant/index';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const guest_id = req.headers['guest-id']?.trim();
    const hostname = req.get('origin') ? `${req.get('origin')}/` : `${req.protocol}://${req.get('host')}/`;
    const domain = hostname.split('://')[1].split(':')[0];
    if (!req.info) req.info = {};
    req.info.device_hash = encryptDevice(domain, req.headers.device);
    req.info.language = req.headers['accept-language'];

    if (!guest_id) throw new UnauthorizedException(AUTH_FAIL);

    // We no longer persist guest users in the DB (guest_id and is_registered columns removed).
    req.info.user = {
      id: null,
      guest_id,
    } as any;

    req.info.client = USER_CLIENT.USER;

    req.info.ip = req.headers.ip;
    req.info.domain = domain;
    req.info.host = hostname;
    req.info.url = req.originalUrl;

    return true;
  }
}
