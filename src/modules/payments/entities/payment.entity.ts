import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Register } from '../../../register/entities/register.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  utr_number: string;

  @Column()
  screenshot_url: string;

  @ManyToOne(() => Register)
  @JoinColumn({ name: 'register_id' })
  register: Register;
}