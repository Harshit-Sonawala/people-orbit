import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('auth_sessions') // table name auth_sessions
export class AuthSessionsEntity {
  @PrimaryColumn({ type: 'varchar' })
  sessionId!: string;

  @Column({ type: 'varchar' })
  userId!: string;

  @Column({ type: 'varchar' })
  refreshTokenHash!: string;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseInt(value, 10),
    },
  })
  expiresAt!: number;
}
