import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Order Mangment System.')
    .setDescription(
      'Welcome to the Order Management System API documentation. This API provides a comprehensive set of endpoints to manage products, orders, user authentication, shopping carts, and user profiles. Below is an overview of the available endpoints and their functionalities:',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(port);
}
bootstrap();
