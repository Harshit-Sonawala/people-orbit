import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('sessions') // table name sessions
export class SessionsEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  refreshTokenHash: string;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseInt(value, 10),
    },
  })
  expiry: number;
}
