import {MigrationInterface, QueryRunner} from "typeorm";

export class UserCreation1645724412615 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            'create table "user"('+
                '"id" serial primary key,' +
                '"name" varchar(255) not null,' +
                '"date" timestamp not null' +
            ')');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query('drop table "user"');
    }
}
