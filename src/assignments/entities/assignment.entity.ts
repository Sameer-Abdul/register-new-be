import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  register_id: number;

  @Column({ nullable: true })
  register_state: string;

  @Column({ nullable: true })
  register_district: string;

  @Column({ nullable: true })
  register_mandal: string;

  // File information
  @Column({ nullable: true })
  file_name: string;

  @Column({ nullable: true })
  file_type: string;

  @Column({ nullable: true })
  file_size: number;

  @Column({ type: 'bytea', nullable: true })
  file_data: Buffer;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  submission_date: Date;

  // Rating & context
  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  context: string;
}
