import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Register } from '../../../register/entities/register.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Register, { onDelete: 'CASCADE' })
  register: Register;

  @Column()
  utr_number: string;

  @Column()
  screenshot_url: string;

  @Column()
  paid_at: Date;
}