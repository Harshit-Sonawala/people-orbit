import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthSessionsTable1780554708547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "auth_sessions" (
        "id" VARCHAR PRIMARY KEY,
        "userId" VARCHAR NOT NULL REFERENCES users("id") ON DELETE CASCADE,
        "refreshTokenHash" VARCHAR NOT NULL,
        "expiresAt" BIGINT NOT NULL
      ) 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "auth_sessions"`);
  }
}
