import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//app = aplicacion de nest propiamente
  //opcion global
  app.setGlobalPrefix("api/v2"); //antepone el api a todas als rutas de nuestrols controllers
  app.useGlobalPipes( 
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );
  await app.listen(3000);
}
bootstrap();
