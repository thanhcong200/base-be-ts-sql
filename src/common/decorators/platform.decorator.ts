import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// get token request
export const PlatformScope = createParamDecorator((fieldName: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const platform = req.headers['platform']?.trim();
  if (platform === 'ios' || platform == 'android') {
    return {
      platform,
      is_mobile: true,
    };
  }
  return {
    platform,
    is_mobile: false,
  };
});
