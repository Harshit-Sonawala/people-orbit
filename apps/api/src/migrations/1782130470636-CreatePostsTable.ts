import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostsTable1782130470636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "status_enum" AS ENUM('draft', 'published', 'closed');`,
    );

    await queryRunner.query(`
      CREATE TABLE "posts" (
        "id" VARCHAR NOT NULL PRIMARY KEY,
        "title" VARCHAR(150) NOT NULL,
        "description" VARCHAR NOT NULL,
        "location" VARCHAR(150) NOT NULL,
        "company" VARCHAR NOT NULL,
        "postedBy" VARCHAR NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "createdAt" BIGINT NOT NULL,
        "updatedAt" BIGINT NOT NULL,
        "skills" TEXT ARRAY,
        "industry" VARCHAR,
        "type" VARCHAR,
        "status" "status_enum" NOT NULL DEFAULT 'draft',
        "applicants" BIGINT DEFAULT 0,
        "interested" TEXT ARRAY
      );
    `);

    await queryRunner.query(
      `CREATE INDEX "IDX_posts_postedBy" ON "posts" ("postedBy");`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_posts_createdAt" ON "posts" ("createdAt" DESC);`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_posts_company" ON "posts" ("company");`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_posts_location" ON "posts" ("location");`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_posts_postedBy";`);
    await queryRunner.query(`DROP INDEX "IDX_posts_createdAt";`);
    await queryRunner.query(`DROP INDEX "IDX_posts_employer";`);

    await queryRunner.query(`DROP TABLE "posts";`);

    await queryRunner.query(`DROP TYPE "status_enum";`);
  }
}
