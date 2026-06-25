import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersCompanyAndLocationColumns1782364670767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users"
        ADD COLUMN IF NOT EXISTS "company" VARCHAR(100) NOT NULL DEFAULT 'Unknown',
        ADD COLUMN IF NOT EXISTS "location" VARCHAR(100);`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "company" DROP DEFAULT;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users"
        DROP COLUMN IF NOT EXISTS "company",
        DROP COLUMN IF NOT EXISTS "location";
      `,
    );
  }
}
