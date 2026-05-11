import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColumn1778495554301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "role_enum" AS ENUM('user', 'manager', 'admin')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "role_enum" NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "role_enum"`);
    }

}
