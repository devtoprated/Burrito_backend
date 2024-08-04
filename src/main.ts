import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  * as session  from 'express-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import * as express from "express";
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  const config = new DocumentBuilder()
    .setTitle('Burrito Shop')
    .setDescription('Burrito Shop is Sales and ordering system')
    .setVersion('1.0')
    .addBearerAuth({
      type:'http',
      scheme:'bearer',
      bearerFormat:'JWT',
      name:'JWT',
      description:'Enter JWT token',
      in:'header'
    },'JWT-auth')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use("/public", express.static(join(__dirname, "..", "public")));
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`)
  });
}
bootstrap();
