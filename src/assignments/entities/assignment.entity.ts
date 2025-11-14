import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  // Foreign key - register table
  @Column({ name: 'register_id' })
  registerId: number;

  // Register location fields coming from register table
  @Column({ name: 'register_state', nullable: true })
  registerState: string;

  @Column({ name: 'register_district', nullable: true })
  registerDistrict: string;

  @Column({ name: 'register_mandal', nullable: true })
  registerMandal: string;

  // Assignment context / description
  @Column({ nullable: true })
  context: string;

  // File data (base64 or text or url)
  @Column({ name: 'file_data', type: 'text', nullable: true })
  fileData: string;

  // Rating field
  @Column({ type: 'int', nullable: true })
  rating: number;

  // Register name fields (used in service)
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;
}
