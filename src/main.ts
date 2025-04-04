import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS beállítások
  app.enableCors({
    origin: '*', // Ezt később szigorítani kell, pl.: ['http://localhost:5173']
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('danubia_api');
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

