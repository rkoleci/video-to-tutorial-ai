import { MigrationInterface, QueryRunner } from "typeorm";

export class Main1756118948481 implements MigrationInterface {
    name = 'Main1756118948481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutorial" ADD "videoDescription" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutorial" DROP COLUMN "videoDescription"`);
    }

}
