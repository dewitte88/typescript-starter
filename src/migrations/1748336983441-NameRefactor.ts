import { MigrationInterface, QueryRunner } from "typeorm";

export class NameRefactor1748336983441 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "name" RENAME COLUMN "name" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "name" RENAME COLUMN "title" TO "name"`);
    }

}
