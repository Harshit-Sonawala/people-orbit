import { Entity, PrimaryColumn, Column, Index } from 'typeorm';
import { type SocialLinks } from './types/social-links.type';
import { UserRole } from './types/user-role.enum';

@Entity('users') // table name users
export class UsersEntity {
  @PrimaryColumn({ type: 'varchar' })
  id!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @Index()
  firstName!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @Index()
  lastName!: string;

  @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 128, select: false, nullable: false })
  password!: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  designation!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Index()
  company!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Index()
  location?: string;

  @Column({ type: 'smallint', nullable: true })
  age?: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column({ type: 'varchar', length: 20 })
  phone!: string;

  @Column({ type: 'varchar', nullable: true })
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
  createdAt!: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseInt(value, 10),
    },
  })
  updatedAt!: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  isBanned!: boolean;
}
