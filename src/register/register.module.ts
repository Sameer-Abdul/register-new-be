// src/register/register.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';
import { Location } from './entities/location.entity';
import { Tenant } from './entities/tenant.entity.js';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Register,
      Location,
      Tenant
    ])
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService]
})
export class RegisterModule {}