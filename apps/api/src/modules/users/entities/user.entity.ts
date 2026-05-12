import { Entity, PrimaryColumn, Column, Index } from "typeorm";
import { type SocialLinks } from '../types';

@Entity('users') // table name users
export class UserEntity {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "varchar", length: 30 })
  @Index()
  firstName: string;

  @Column({ type: "varchar", length: 30 })
  @Index()
  lastName: string;

  @Column({ type: "smallint", nullable: true })
  age?: number;

  @Column({ type: "varchar", length: 40 })
  @Index()
  designation: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar", length: 20 })
  phone: string;

  @Column({ type: "varchar", length: 140, nullable: true })
  bio?: string;

  @Column({ type: "text", array: true, nullable: true })
  skills?: string[];

  @Column({ type: "jsonb", nullable: true })
  socialLinks?: SocialLinks;

  @Column({ type: "text", nullable: true })
  profilePic?: string;

  @Column({ type: "text", nullable: true })
  bgImage?: string;

  @Column({ type: "timestamptz" })
  createdOn: Date;

  @Column({ type: "timestamptz" })
  updatedOn: Date;
}