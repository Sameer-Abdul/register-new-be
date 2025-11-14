import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @Column()
  last_name: string;

  @Column()
  mobile_no: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: string;

  @Column()
  dob: string;

  @Column()
  marital_status: string;

  @Column()
  state: string;

  @Column()
  district: string;

  @Column()
  mandal: string;

  @Column()
  subject: string;

  @Column()
  experience: string;

  @Column()
  address: string;

  @Column()
  qualification: string;

  @Column()
  telegram_chat_id: string;
}