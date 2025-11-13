import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Register } from './register/entities/register.entity';
import { Payment } from './modules/payments/entities/payment.entity';

config();

const configService = new ConfigService();

// Get DATABASE_URL from environment with sslmode=require
const databaseUrl = configService.get('DATABASE_URL');
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Parse the connection URL
const dbUrl = new URL(databaseUrl);
const sslRequired = dbUrl.searchParams.get('sslmode') === 'require';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  entities: [Register, Payment],
  synchronize: false,
  logging: true,
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  ssl: sslRequired ? {
    rejectUnauthorized: false, // Required for self-signed certificates
  } : false,
  extra: sslRequired ? {
    ssl: {
      rejectUnauthorized: false
    }
  } : {}
});
