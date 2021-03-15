import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api');

  const swagger = new DocumentBuilder()
    .setTitle('Live-api')
    .setDescription('Live api endpoint')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
      },
      'accessToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, document);

  const config = app.get(ConfigService);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Running on port ${process.env.PORT}`);
  logger.log(`Running in ${config.get('environment')} mode`);
}
bootstrap();
