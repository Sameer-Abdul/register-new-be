import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register } from '../register/entities/register.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Register)
    private registerRepository: Repository<Register>,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.registerRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
