import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Fancho Server API')
  .setDescription('The API documentation for building Fancho project')
  .setVersion('1.0')
  .addTag('API Docs')
  .addSecurity('basic', {
    type: 'http',
    scheme: 'basic',
    description: 'Key in username password crosspoding',
  })
  .addBearerAuth({
    description: 'Token after login',
    type: 'http',
    in: 'header',
    scheme: 'bearer',
  })
  .addApiKey({ type: 'apiKey', name: 'secretkey', in: 'header', description: 'API Key For External calls' })
  .build();

export const customOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Fancho API Docs',
  swaggerOptions: {
    persistAuthorization: true,
  },
};
