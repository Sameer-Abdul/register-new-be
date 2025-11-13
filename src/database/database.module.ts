// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from '../register/entities/register.entity';
import { Payment } from '../modules/payments/entities/payment.entity';
import { Assignment } from '../assignments/entities/assignment.entity';
import { Location } from '../locations/entities/location.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get('DATABASE_URL');
        if (!databaseUrl) {
          throw new Error('DATABASE_URL is not defined in the configuration');
        }

        // Parse the connection URL to check for SSL requirement
        const dbUrl = new URL(databaseUrl);
        const sslRequired = dbUrl.searchParams.get('sslmode') === 'require';
        
        return {
          type: 'postgres',
          url: databaseUrl,
          entities: [Register, Payment, Assignment, Location],
          migrations: [path.join(__dirname, '../../migrations/*.ts')],
          migrationsRun: true, // Run migrations on startup
          synchronize: false, // Keep this as false when using migrations
          logging: ['error', 'warn', 'schema'], // More detailed logging
          namingStrategy: new SnakeNamingStrategy(), // Use snake_case for database columns
          ssl: sslRequired ? {
            rejectUnauthorized: false, // This is needed for self-signed certificates
          } : false,
          extra: sslRequired ? {
            ssl: {
              rejectUnauthorized: false
            }
          } : {}
        };
      },
    }),
  ],
})
export class DatabaseModule {}