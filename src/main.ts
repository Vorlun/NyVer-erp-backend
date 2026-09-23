import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module.js';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter.js';
import { ResponseInterceptor } from './common/interceptors/response.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ── Body-parser limits (base64 rasm yuklash uchun 50mb) ─────────────────
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Static files serving (receipts, attachments)
  app.useStaticAssets(path.join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3001',
    ],
    credentials: true,
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Global Exception Filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Global Response Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Nyver ERP/LMS API')
    .setDescription("O'quv markazlari uchun ERP/LMS tizimi API hujjatlari")
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Autentifikatsiya')
    .addTag('Users', 'Foydalanuvchilar boshqaruvi')
    .addTag('Courses', 'Kurslar')
    .addTag('Rooms', 'Xonalar')
    .addTag('Groups', 'Guruhlar')
    .addTag('Lessons', 'Darslar')
    .addTag('Attendance', 'Davomat')
    .addTag('Homework', 'Uy vazifalari')
    .addTag('Payments', "To'lovlar")
    .addTag('Gamification', 'Tangalar va Sovrinlar')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Nyver ERP server ishga tushdi: http://localhost:${port}`);
  console.log(`📚 Swagger UI: http://localhost:${port}/api/docs`);
}

await bootstrap();
