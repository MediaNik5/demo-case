import {MigrationInterface, QueryRunner} from "typeorm";

export class CarRefactoring1645725829090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            'create table "car"(' +
                '"id" serial primary key,' +
                '"brand" varchar(50) not null,' +
                '"owner" integer references "user"("id") not null' +
            ')'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query('drop table "car"')
    }

}
