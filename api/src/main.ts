import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@/app.module';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { AllExceptionsFilter } from '@/common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // For Class Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // It will remove unwanted properties from the POST request
      transformOptions: {
        exposeUnsetFields: false, // ✅ removes undefined values
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000', // or your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow cookies/auth headers
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
