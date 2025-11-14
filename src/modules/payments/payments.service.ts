import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Register } from '../../register/entities/register.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Register)
    private readonly registerRepo: Repository<Register>,
  ) {}

  async uploadPayment(registerId: number, utr: string, screenshot_url: string) {
    const register = await this.registerRepo.findOne({ where: { id: registerId } });
    if (!register) throw new Error('Register not found');

    const payment = this.paymentRepo.create({
      utr_number: utr,
      screenshot_url,
      paid_at: new Date(),
      register,
    });

    return this.paymentRepo.save(payment);
  }

  async getPaymentByRegister(registerId: number) {
    return this.paymentRepo.findOne({
      where: { register: { id: registerId } },
      relations: ['register'],
    });
  }
}
