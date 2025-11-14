import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow all origins for Vercel deployment
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Initialize the application but don't call listen()
  await app.init();
  console.log('✅ Application initialized');
  
  return app;
}

// Export the bootstrap function for Vercel serverless
const appPromise = bootstrap();

export { appPromise };
