import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1748353857324 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "name" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "name" DROP COLUMN "description"`);
    }

}
