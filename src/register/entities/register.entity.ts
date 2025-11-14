import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('register')
export class Register {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'mobile_no' })
  mobileNo: string;

  @Column({ unique: true })
  email: string;

  @Column()
  state: string;

  @Column()
  district: string;

  @Column()
  mandal: string;

  // Other existing fields
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'marital_status' })
  maritalStatus: string;

  @Column({ 
    name: 'marriage_date', 
    type: 'timestamp with time zone', 
    nullable: true 
  })
  marriageDate?: Date;

  @Column({ type: 'text' })
  address: string;

  @Column()
  gender: string;

  @Column({ default: 'Award Nomination' })
  course: string;

  @Column()
  designation: string;

  @Column({ name: 'highest_class_i_teach' })
  highestClassITeach: string;

  @Column({ name: 'school_correspondent_name' })
  schoolCorrespondentName: string;

  @Column({ name: 'school_correspondent_phone' })
  schoolCorrespondentPhone: string;

  @Column({ name: 'school_correspondent_email' })
  schoolCorrespondentEmail: string;

  @Column({ name: 'utr_number', nullable: true })
  utrNumber: string;

  @Column({ name: 'payment_screenshot', type: 'bytea', nullable: true })
  paymentScreenshot: Buffer;

  @Column({ name: 'screenshot_mime_type', nullable: true })
  screenshotMimeType: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}