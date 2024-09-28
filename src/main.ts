import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppConfig from './modules/shared/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(AppConfig).getApplicationPort();
  app.setGlobalPrefix("api");
  app.enableVersioning();
  await app.listen(port);
}
bootstrap();
