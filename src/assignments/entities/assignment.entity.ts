import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Register } from '../../register/entities/register.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Register, { onDelete: 'CASCADE' })
  register: Register;

  @Column()
  state: string;

  @Column()
  district: string;

  @Column()
  mandal: string;
}
