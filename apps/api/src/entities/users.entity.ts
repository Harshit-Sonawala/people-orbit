import { Entity, PrimaryColumn, Column, Index } from 'typeorm';
import { type SocialLinks, UserRole } from '../modules/users/types';

@Entity('users') // table name users
export class UsersEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar', length: 30 })
  @Index()
  firstName: string;

  @Column({ type: 'varchar', length: 30 })
  @Index()
  lastName: string;

  @Column({ type: 'smallint', nullable: true })
  age?: number;

  @Column({ type: 'varchar', length: 40 })
  @Index()
  designation: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 128, select: false, nullable: false })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 140, nullable: true })
  bio?: string;

  @Column({ type: 'text', array: true, nullable: true })
  skills?: string[];

  @Column({ type: 'jsonb', nullable: true })
  socialLinks?: SocialLinks;

  @Column({ type: 'text', nullable: true })
  profilePic?: string;

  @Column({ type: 'text', nullable: true })
  bgImage?: string;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseInt(value, 10),
    },
  })
  createdOn: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseInt(value, 10),
    },
  })
  updatedOn: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  isBanned: boolean;
}
