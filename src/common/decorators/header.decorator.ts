import {createParamDecorator, ExecutionContext} from '@nestjs/common';

// get token request
export const HeaderScope = createParamDecorator((fieldName: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  return fieldName ? req.info[fieldName] : req.info;
});
