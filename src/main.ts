import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppConfig from './infrastructure/configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(AppConfig).serverPort;
  app.setGlobalPrefix('api');
  app.enableVersioning();
  app.enableCors({
    allowedHeaders: '*',
    methods: '*',
    origin: '*',
  });
  await app.listen(port);
}
bootstrap();
