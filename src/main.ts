import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppConfig from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks
  await app.listen(AppConfig.APP_PORT || 3000);
}
bootstrap();
