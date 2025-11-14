import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import 'reflect-metadata';

let cachedServer: Handler;

async function bootstrapServer() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule, { bodyParser: true });

    // Enable CORS
    app.enableCors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    });

    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

// ✅ Vercel requires a default export that works as a handler
export default async function handler(
  event: any,
  context: Context,
  callback: Callback,
) {
  const server = await bootstrapServer();
  return server(event, context, callback);
}
