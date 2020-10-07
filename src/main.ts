import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { config } from "./config";
import { ValidationError } from 'class-validator';
import { config as awsConfig } from "aws-sdk"
import * as _ from "lodash"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error']
  });

  app.setGlobalPrefix("/api");

  app.enableCors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization", "X-Requested-With"]
  })

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      validationError: {
        target: false,
      },
    }),
  );

  awsConfig.update({
    region: config.awsRegion,
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
  })

  const port = process.env.PORT || 5003

  await app.listen(port, () => {
    console.log(`App is running on:`)
    console.table({
      PORT: port,
      "NODE ENV": process.env.NODE_ENV,
      "DB HOST": config.host
    })
  });
}
bootstrap();
