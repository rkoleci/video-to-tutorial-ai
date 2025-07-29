import { MigrationInterface, QueryRunner } from "typeorm";

export class  $MNAME1753800165418 implements MigrationInterface {
    name = ' $MNAME1753800165418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test" ("id" SERIAL NOT NULL, "title" text NOT NULL, CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "test"`);
    }

}
