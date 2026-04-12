import {getCountryByIp} from '@common/utils';
import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const CountryScope = createParamDecorator(async (fieldName: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const rs = await getCountryByIp(req.info.ip);
  return rs;
});
