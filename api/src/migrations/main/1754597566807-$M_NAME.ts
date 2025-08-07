import { MigrationInterface, QueryRunner } from "typeorm";

export class  $MNAME1754597566807 implements MigrationInterface {
    name = ' $MNAME1754597566807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "picture" character varying, "loginToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_32db2dccb984f93fd8a90ea0559" UNIQUE ("loginToken"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tutorial_status_enum" AS ENUM('pending', 'processing', 'completed', 'failed')`);
        await queryRunner.query(`ALTER TABLE "tutorial" ADD "status" "public"."tutorial_status_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutorial" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."tutorial_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
