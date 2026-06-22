import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('refresh_tokens') // table name refresh_tokens
export class RefreshTokensEntity {
  @PrimaryColumn({ type: 'varchar' })
  id!: string;

  @Column({ type: 'varchar' })
  refreshToken!: string;
}
