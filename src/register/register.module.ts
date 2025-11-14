import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { Location } from './entities/location.entity';
import { Tenant } from './entities/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, Tenant]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}