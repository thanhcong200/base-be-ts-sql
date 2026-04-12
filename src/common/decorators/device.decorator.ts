import { PLATFORM } from '@common/enums';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const DeviceScope = createParamDecorator((fieldName: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const platform_device_id = req.headers['platform-device-id']?.trim();
  const device_name = req.headers['device-name']?.trim();
  const platform = req.headers['platform']?.trim() as PLATFORM;
  const app_version = req.headers['app-version']?.trim();
  const device = {
    platform_device_id: platform_device_id,
    device_name: device_name,
    platform: platform,
    app_version: app_version,
  };
  return fieldName ? (device || {})[fieldName] : device;
});
