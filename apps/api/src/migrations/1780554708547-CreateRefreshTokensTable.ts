import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRefreshTokensTable1780554708547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "refresh_tokens" (
        "id" VARCHAR PRIMARY KEY,
        "refreshToken" VARCHAR NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
  }
}
