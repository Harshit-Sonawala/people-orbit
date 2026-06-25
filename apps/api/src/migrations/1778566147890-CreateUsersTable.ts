import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1778566147890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" VARCHAR NOT NULL PRIMARY KEY,
        "firstName" VARCHAR(50) NOT NULL,
        "lastName" VARCHAR(50) NOT NULL,
        "email" VARCHAR(200) NOT NULL UNIQUE,
        "designation" VARCHAR(100) NOT NULL,
        "age" SMALLINT,
        "phone" VARCHAR(20) NOT NULL,
        "bio" VARCHAR,
        "skills" TEXT ARRAY,
        "socialLinks" JSONB,
        "profilePic" TEXT,
        "bgImage" TEXT,
        "createdAt" BIGINT NOT NULL,
        "updatedAt" BIGINT NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
