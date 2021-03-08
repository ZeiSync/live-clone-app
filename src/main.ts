import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = process.env.PORT || 3000
  await app.listen(port);
  logger.log(`Running on port ${process.env.PORT}`);
  logger.log(`Running in ${config.get('environment')} mode`);
}
bootstrap();
