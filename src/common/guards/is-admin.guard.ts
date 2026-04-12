import { USER_CLIENT } from '@common/enums';
import { YOU_MUST_BE_ADMIN } from '@constant/error-messages';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
@Injectable()
export class IsAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.info) req.info = {};
    if (req.info.client != USER_CLIENT.ADMIN) throw new ForbiddenException(YOU_MUST_BE_ADMIN);
    return true;
  }
}
