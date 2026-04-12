import { USER_CLIENT } from '@common/enums';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
@Injectable()
export class IsUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.info) req.info = {};
    if (req.info.client != USER_CLIENT.USER) throw new ForbiddenException();
    return true;
  }
}
