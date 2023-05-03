import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
//import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text({ type: 'text/html' }));
  app.use(bodyParser.json());
  //app.use(multer)
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT, () => {
    console.log(`Server Started at PORT : ${process.env.PORT}`);
  });
}
bootstrap();
