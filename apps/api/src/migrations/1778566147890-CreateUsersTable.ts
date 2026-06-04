import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1778566147890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" VARCHAR NOT NULL PRIMARY KEY,
        "firstName" VARCHAR(30) NOT NULL,
        "lastName" VARCHAR(30) NOT NULL,
        "age" SMALLINT,
        "designation" VARCHAR(40) NOT NULL,
        "email" VARCHAR(100) NOT NULL UNIQUE,
        "phone" VARCHAR(20) NOT NULL,
        "bio" VARCHAR(140),
        "skills" TEXT ARRAY,
        "socialLinks" JSONB,
        "profilePic" TEXT,
        "bgImage" TEXT,
        "createdAt" BIGINT NOT NULL,
        "updatedAt" BIGINT NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
