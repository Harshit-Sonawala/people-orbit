import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1778566147890 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" varchar NOT NULL,
        "firstName" varchar(30) NOT NULL,
        "lastName" varchar(30) NOT NULL,
        "age" smallint,
        "designation" varchar(40) NOT NULL,
        "email" varchar NOT NULL,
        "phone" varchar(20) NOT NULL,
        "bio" varchar(140),
        "skills" text array,
        "socialLinks" jsonb,
        "profilePic" text,
        "bgImage" text,
        "createdOn" timestamptz NOT NULL,
        "updatedOn" timestamptz NOT NULL,
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_email" UNIQUE ("email")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }

}
