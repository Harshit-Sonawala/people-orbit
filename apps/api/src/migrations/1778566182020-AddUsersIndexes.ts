import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersIndexes1778566182020 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX "IDX_firstName" ON "users" ("firstName")`);
    await queryRunner.query(`CREATE INDEX "IDX_lastName" ON "users" ("lastName")`);
    await queryRunner.query(`CREATE INDEX "IDX_designation" ON "users" ("designation")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_firstName"`);
    await queryRunner.query(`DROP INDEX "IDX_lastName"`);
    await queryRunner.query(`DROP INDEX "IDX_designation"`);
  }

}
