import { MigrationInterface, QueryRunner } from "typeorm";

export class Main1755945932961 implements MigrationInterface {
    name = 'Main1755945932961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ip" character varying NOT NULL, "hits" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_68059cc4f31211afed10684aef6" UNIQUE ("ip"), CONSTRAINT "PK_7bc33e71ab6c3b71eac72950b44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tutorial_status_enum" AS ENUM('pending', 'processing', 'completed', 'failed')`);
        await queryRunner.query(`CREATE TABLE "tutorial" ("id" SERIAL NOT NULL, "title" text NOT NULL, "vid" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "tutorial" text NOT NULL, "status" "public"."tutorial_status_enum" NOT NULL DEFAULT 'pending', "userId" uuid NOT NULL, CONSTRAINT "PK_4d07a72cfa203b3b21bde6da1b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "picture" character varying, "loginToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_32db2dccb984f93fd8a90ea0559" UNIQUE ("loginToken"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tutorial" ADD CONSTRAINT "FK_9b4592ddb8a5aa71787e2cb039c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutorial" DROP CONSTRAINT "FK_9b4592ddb8a5aa71787e2cb039c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tutorial"`);
        await queryRunner.query(`DROP TYPE "public"."tutorial_status_enum"`);
        await queryRunner.query(`DROP TABLE "usage"`);
    }

}
