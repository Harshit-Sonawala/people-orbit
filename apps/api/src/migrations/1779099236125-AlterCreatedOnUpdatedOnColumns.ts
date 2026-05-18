import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCreatedOnUpdatedOnColumns1779099236125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "createdOn" TYPE BIGINT USING (EXTRACT(EPOCH FROM "createdOn") * 1000)::BIGINT,
      ALTER COLUMN "updatedOn" TYPE BIGINT USING (EXTRACT(EPOCH FROM "updatedOn") * 1000)::BIGINT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "createdOn" TYPE TIMESTAMPTZ USING TO_TIMESTAMP("createdOn" / 1000.0),
      ALTER COLUMN "updatedOn" TYPE TIMESTAMPTZ USING TO_TIMESTAMP("updatedOn" / 1000.0);
    `);
  }
}
