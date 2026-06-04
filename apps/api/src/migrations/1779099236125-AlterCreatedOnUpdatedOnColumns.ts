import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCreatedOnUpdatedOnColumns1779099236125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "createdAt" TYPE BIGINT USING (EXTRACT(EPOCH FROM "createdAt") * 1000)::BIGINT,
      ALTER COLUMN "updatedAt" TYPE BIGINT USING (EXTRACT(EPOCH FROM "updatedAt") * 1000)::BIGINT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "createdAt" TYPE TIMESTAMPTZ USING TO_TIMESTAMP("createdAt" / 1000.0),
      ALTER COLUMN "updatedAt" TYPE TIMESTAMPTZ USING TO_TIMESTAMP("updatedAt" / 1000.0);
    `);
  }
}
